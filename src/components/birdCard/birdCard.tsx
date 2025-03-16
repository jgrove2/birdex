"use client";
import Image from "next/image";
import testBird from "@/../public/birdSketchCanvas.jpg";
import styles from "./birdCard.module.css";
import { motion } from "framer-motion";
type BirdCardProps = {
  birdId: string;
  birdName: string;
  enabled: boolean;
  onClick: () => void;
};

export default function BirdCard({
  birdId,
  birdName,
  enabled,
  onClick,
}: BirdCardProps) {
  return (
    <motion.button
      className={styles.bird_card}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Image
        src={testBird}
        alt="Bird"
        width={120}
        height={120}
        className={
          enabled
            ? styles.bird_card_image_visible
            : styles.bird_card_image_hidden
        }
      />
      <div>{enabled ? <span>{birdName}</span> : <span>{birdId}</span>}</div>
    </motion.button>
  );
}
