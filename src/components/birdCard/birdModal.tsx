"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import "@/styles/animations.css";
import "./birdModal.css";
export default function BirdModal({
  birdId,
  handleClose,
}: {
  birdId: string;
  handleClose: () => void;
}) {
  if (birdId === null || birdId === undefined || birdId === "") {
    return null;
  }
  return (
    <Backdrop onClick={handleClose}>
      <div className={"bird_modal"}>
        <div className={"bird_front"}>
          <div className={"heading"}>
            <span>Bird {birdId}</span>
          </div>
          <Image
            src={"/birdSketchCanvas.jpg"}
            alt={`Bird ${birdId}`}
            width={200}
            height={200}
          />
          <div className={"description"}>
            <span>Description</span>
          </div>
        </div>
        <motion.div className={"bird_back"}>
          <h1>Bird {birdId}</h1>
        </motion.div>
        <div className={"mouse_position_tracker"}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Backdrop>
  );
}

const Backdrop = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={backdropRef}
      onClick={(event) => {
        if (event.target === backdropRef.current) {
          backdropRef.current.style.cursor = "pointer";
          onClick();
        }
      }}
      className={"backdrop"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
