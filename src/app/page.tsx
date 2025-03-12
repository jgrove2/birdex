import styles from "./page.module.css";
import R2Image from "@/components/image";
import BirdCard from "@/components/birdCard/birdCard";
import "./page.css";
import Image from "next/image";
export const runtime = "edge";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.image_container}>
        <Image
          width={5120}
          height={2880}
          src={`${process.env.R2_PUBLIC_URL}/mainHeader-1.webp`}
          alt="Birdex"
          className={"banner_image"}
        />
      </div>
      <div className={styles.content_container}>
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
      </div>
    </div>
  );
}
