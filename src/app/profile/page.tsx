"use client";
export const runtime = "edge";
import "./profile.css";
import Image from "next/image";
import styles from "./profile.module.css";
import ProfileBlurb from "@/components/profile/profileBlurb";
import NumberCard from "@/components/profile/numberCard";
import { SquareLoader } from "react-spinners";
import { Dialog } from "@/components/dialog";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import { useFollowers } from "@/hooks/useFollowers";
import { useFollowing } from "@/hooks/useFollowing";
import { useUser } from "@clerk/nextjs";
import { ClerkUser } from "@/types/clerk";
export default function Profile() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const {
    data: userData,
    isPending: userDataPending,
    refetch: refetchUserData,
  } = useUserData(user as ClerkUser);

  const { data: followers, isPending: followersPending } = useFollowers(
    userData?.id
  );
  const { data: following, isPending: followingPending } = useFollowing(
    userData?.id
  );

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
        refetchUserData();
      }
    } catch (error) {
      console.error("Failed to update blurb:", error);
    }
  };

  const openFollowersDialog = () => {
    router.push("/profile?showDialog=y&type=followers");
  };

  const openFollowingDialog = () => {
    router.push("/profile?showDialog=y&type=following");
  };

  if (!isLoaded) return null;

  return (
    <div className={styles.profile_container}>
      <Dialog redirect={"/profile"} searchToggle={true} />
      <div className={styles.profile_header}>
        <div className={"profile_header_content"}>
          <div className={"profile_header_content_main_container"}>
            {!userDataPending && !followersPending && !followingPending ? (
              <>
                <div
                  className={
                    "profile_header_content_main_container_image_container"
                  }
                >
                  <Image
                    src={user?.imageUrl ?? ""}
                    alt={"Profile Picture"}
                    width={800}
                    height={800}
                    className={"profile_header_content_image"}
                  />
                  <button className={"sign_out_button"}>Sign Out</button>
                </div>
                <div className={"profile_header_content_text"}>
                  <span className={styles.profile_header_content_text_name}>
                    {user?.fullName}
                    <span className={styles.profile_user_id}>
                      #{userData?.id}
                    </span>
                  </span>
                  <div
                    className={
                      "profile_header_content_text_number_card_container"
                    }
                  >
                    <NumberCard
                      number={following?.length ?? 0}
                      label={"Following"}
                      onClick={openFollowingDialog}
                    />
                    <NumberCard
                      number={followers?.length ?? 0}
                      label={"Followers"}
                      onClick={openFollowersDialog}
                    />
                    <NumberCard number={0} label={"Birds"} onClick={() => {}} />
                  </div>
                </div>
                <ProfileBlurb
                  initialBlurb={userData?.blurb ?? ""}
                  refetchData={() => {}}
                  updateBlurb={updateBlurb}
                />
              </>
            ) : (
              <div
                className={styles.profile_header_content_main_container_loader}
              >
                <SquareLoader color={"var(--text)"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
