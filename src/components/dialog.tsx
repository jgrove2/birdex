"use client";
import { JSX, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./dialog.css";
import { FollowingModal } from "./profile/socialModal/socialModal";
import { FollowersModal } from "./profile/socialModal/socialModal";
import { useUser } from "@clerk/nextjs";

export function Dialog({
  redirect,
  searchToggle,
}: {
  redirect: string;
  searchToggle: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const showDialog = searchParams.get("showDialog");
  const type = searchParams.get("type");
  const { isSignedIn, user } = useUser();
  const [userData, setUserData] = useState({
    blurb: "",
    id: -1,
  });
  useEffect(() => {
    const fetchBlurb = async () => {
      if (!user) return;
      const response = await fetch(`/api/users?userId=${user.id}`);
      const data = await response.json();
      setUserData(data);
    };

    if (isSignedIn && user) {
      fetchBlurb();
    }
  }, [user, isSignedIn]);

  useEffect(() => {
    if (showDialog === "y") {
      console.log("showDialog", showDialog);
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const handleClose = () => {
    router.push(redirect);
    dialogRef.current?.close();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog ref={dialogRef} onClose={handleClose} className="dialog">
        <button className="close_button" onClick={handleClose}>
          ×
        </button>
        {type === "followers" ? (
          <FollowersModal userId={userData.id} />
        ) : (
          <FollowingModal searchToggle={searchToggle} userId={userData.id} />
        )}
      </dialog>
    ) : null;

  return dialog;
}
