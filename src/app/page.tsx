"use client";
import styles from "./page.module.css";
import BirdCard from "@/components/birdCard/birdCard";
import "./page.css";
import Image from "next/image";
export const runtime = "edge";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useUser } from "@clerk/nextjs";
import { DragHandle } from "@/components/icons/dragHandle";
import { redirect } from "next/navigation";

export default function Home() {
  const [scrollState, setScrollState] = useState<"hidden" | "scroll">("hidden");
  const [userIdentifier, setUserIdentifier] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user, isSignedIn } = useUser();
  useEffect(() => {
    if (user) {
      setUserIdentifier(user.firstName);
    }
  }, [user]);
  // eslint-disable
  useEffect(() => {
    function setScrollPosition() {
      const containerPosition = containerRef.current?.getBoundingClientRect();
      const positions = targetRef.current?.getBoundingClientRect();
      if (
        positions &&
        containerPosition &&
        positions.top <= 0.15 * containerPosition.bottom
      ) {
        setScrollState("scroll");
      } else {
        setScrollState("hidden");
      }
    }
    if (
      targetRef &&
      targetRef.current &&
      containerRef &&
      containerRef.current
    ) {
      targetRef.current.addEventListener("touchmove", setScrollPosition);
      containerRef.current.addEventListener("scroll", setScrollPosition);
    }
    return () => {
      // eslint-disable-next-line
      if (
        targetRef &&
        targetRef.current &&
        containerRef.current &&
        containerRef
      ) {
        // eslint-disable-next-line
        targetRef.current.removeEventListener("scroll", setScrollPosition);
        // eslint-disable-next-line
        containerRef.current.removeEventListener(
          "touchmove",
          setScrollPosition
        );
      }
    };
    // eslint-disable-next-line
  }, [targetRef.current]);

  if (!isSignedIn) {
    redirect("/login");
  }

  return (
    <motion.div className={styles.home_container} ref={containerRef}>
      <div className={styles.image_container}>
        {scrollState === "hidden" && (
          <h1 className={"welcome_text"}>
            {userIdentifier ? `Hello, ${userIdentifier}` : "Hello"}
          </h1>
        )}
        <Image
          width={5120}
          height={2880}
          src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/mainHeader-1.webp`}
          alt="Birdex"
          className={"banner_image"}
          priority
        />
      </div>
      <motion.div className={styles.content_container} ref={targetRef}>
        <div className={styles.drag_handle_container}>
          <DragHandle />
        </div>
        <motion.div
          className={styles.grid_wrapper}
          style={{
            overflow: `${scrollState}`,
          }}
        >
          <div className={styles.content_grid}>
            {Array.from({ length: 10 }).map((_, index) => (
              <BirdCard
                key={index}
                birdId={index.toString()}
                birdName={`Bird ${index}`}
                enabled={true}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
