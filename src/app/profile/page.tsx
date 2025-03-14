"use client";
export const runtime = "edge";
import "./profile.css";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import styles from "./profile.module.css";
import ProfileBlurb from "@/components/profile/profileBlurb";
import { useEffect, useState } from "react";
import NumberCard from "@/components/profile/numberCard";
import { Dialog } from "@/components/dialog";
import { useRouter } from "next/navigation";
import {
  FollowersModal,
  FollowingModal,
} from "@/components/profile/socialModal/socialModal";
export default function Profile() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState({
    blurb: "",
    id: -1,
  });
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [dialogType, setDialogType] = useState("");
  useEffect(() => {
    const fetchBlurb = async () => {
      if (!user) return;
      const response = await fetch(`/api/users?userId=${user.id}`);
      const data = await response.json();
      setUserData(data);
    };

    if (isSignedIn && user) {
      fetchBlurb();
      setRefetch(false);
    }
  }, [user, isSignedIn, refetch]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!userData) return;
      try {
        const response = await fetch(`/followers?userId=${userData.id}`);
        const data = await response.json();
        setFollowers(data.length);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };

    const fetchFollowing = async () => {
      if (!userData) return;
      try {
        const response = await fetch(`/following?userId=${userData.id}`);
        const data = await response.json();
        setFollowing(data.length);
      } catch (error) {
        console.error("Failed to fetch following:", error);
      }
    };

    if (!userData) return;
    if (userData) {
      fetchFollowers();
      fetchFollowing();
    }
  }, [userData]);

  const updateBlurb = async (blurb: string) => {
    if (!user) return;
    try {
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          userName: user.fullName,
          profilePicture: user.imageUrl,
          blurb,
        }),
      });
      if (response.ok) {
        setUserData({ blurb, id: userData.id });
      }
    } catch (error) {
      console.error("Failed to update blurb:", error);
    }
  };

  const openFollowersDialog = () => {
    setDialogType("followers");
    router.push("/profile?showDialog=y");
  };

  const openFollowingDialog = () => {
    setDialogType("following");
    router.push("/profile?showDialog=y");
  };

  const closeDialog = () => {
    router.push("/profile");
  };

  if (!isSignedIn) {
    if (!isLoaded) return null;
    redirect("/");
  }

  return (
    <div className={styles.profile_container}>
      <Dialog closeDialog={closeDialog}>
        {dialogType === "followers" ? (
          <FollowersModal userId={userData.id} />
        ) : (
          <FollowingModal userId={userData.id} />
        )}
      </Dialog>
      <div className={styles.profile_header}>
        <div className={"profile_header_content"}>
          <div className={"profile_header_content_main_container"}>
            <div
              className={
                "profile_header_content_main_container_image_container"
              }
            >
              <Image
                src={user.imageUrl}
                alt={"Profile Picture"}
                width={800}
                height={800}
                className={"profile_header_content_image"}
              />
              <SignOutButton>
                <button className={"sign_out_button"}>Sign Out</button>
              </SignOutButton>
            </div>
            <div className={"profile_header_content_text"}>
              <span className={styles.profile_header_content_text_name}>
                {user.fullName}
                <span className={styles.profile_user_id}>#{userData?.id}</span>
              </span>
              <div
                className={"profile_header_content_text_number_card_container"}
              >
                <NumberCard
                  number={following}
                  label={"Following"}
                  onClick={openFollowingDialog}
                />
                <NumberCard
                  number={followers}
                  label={"Followers"}
                  onClick={openFollowersDialog}
                />
                <NumberCard number={0} label={"Birds"} onClick={() => {}} />
              </div>
            </div>
          </div>
          <ProfileBlurb
            initialBlurb={userData?.blurb}
            refetchData={() => setRefetch(true)}
            updateBlurb={updateBlurb}
          />
        </div>
      </div>
    </div>
  );
}
