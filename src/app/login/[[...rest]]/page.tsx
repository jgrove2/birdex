"use client";
export const runtime = "edge";

import styles from "./login.module.css";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function registerUser() {
      if (user && user.id && (user.fullName || user.username)) {
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              userName: user.fullName || user.username,
              profilePicture: user.imageUrl,
            }),
          });

          if (response.ok || response.status === 400) {
            // Redirect to home page after successful registration
            router.push("/");
          } else {
            throw new Error("Failed to register user in database");
          }
        } catch (error) {
          console.error("Error registering user:", error);
        }
      }
    }

    if (isLoaded && user) {
      registerUser();
    }
  }, [user, isLoaded, router]);

  return (
    <div className={styles.login_page}>
      <SignIn />
    </div>
  );
}
