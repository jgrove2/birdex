"use client";
import HomeIcon from "./icons/home";
import CameraIcon from "./icons/camera";
import PersonIcon from "./icons/person";
import CloseIcon from "./icons/close";
import CameraPopupIcon from "./icons/cameraPopup";
import PhotosIcon from "./icons/photos";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import styles from "./navigationMenu.module.css";

export default function NavigationMenu() {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <SignedIn>
        <div className={styles.navigationMenu}>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className={styles.navigationMenuButton}
            onClick={() => router.push("/")}
          >
            <HomeIcon className={styles.svg} />
          </motion.button>
          <div></div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className={styles.navigationMenuButton}
            onClick={() => router.push("/profile")}
          >
            <PersonIcon className={styles.svg} />
          </motion.button>
          <motion.button
            className={styles.cameraIcon + " " + styles.navigationMenuButton}
            onClick={() => setIsPopupMenuOpen(!isPopupMenuOpen)}
          >
            <div className={styles.cameraIconBorder}></div>
            {isPopupMenuOpen ? (
              <CloseIcon isNavigationBar={false} />
            ) : (
              <CameraIcon isNavigationBar={false} />
            )}
          </motion.button>
        </div>
      </SignedIn>
      <AnimatePresence initial={false}>
        {isPopupMenuOpen ? (
          <motion.div
            className={styles.popupMenuContent}
            key="popupMenu"
            exit={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
          >
            <motion.button
              className={styles.popupMenuButton}
              whileTap={{ scale: 0.85 }}
            >
              <CameraPopupIcon className={styles.svg} />
            </motion.button>
            <motion.button
              className={styles.popupMenuButton}
              whileTap={{ scale: 0.85 }}
            >
              <PhotosIcon className={styles.svg} />
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
