"use client";
import HomeIcon from "./icons/home";
import CameraIcon from "./icons/camera";
import PersonIcon from "./icons/person";
import CloseIcon from "./icons/close";
import PhotosIcon from "./icons/photos";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import styles from "./navigationMenu.module.css";

export default function NavigationMenu() {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className={styles.navigationMenu}>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className={styles.navigationMenuButton}
          onClick={() => router.push("/")}
        >
          <HomeIcon />
        </motion.button>
        <div></div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className={styles.navigationMenuButton}
          onClick={() => router.push("/profile")}
        >
          <PersonIcon />
        </motion.button>
        <motion.button
          className={styles.cameraIcon + " " + styles.navigationMenuButton}
          onClick={() => setIsPopupMenuOpen(!isPopupMenuOpen)}
        >
          <div className={styles.cameraIconBorder}></div>
          {isPopupMenuOpen ? <CloseIcon /> : <CameraIcon />}
        </motion.button>
      </div>
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
              <CameraIcon />
            </motion.button>
            <motion.button
              className={styles.popupMenuButton}
              whileTap={{ scale: 0.85 }}
            >
              <PhotosIcon />
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
