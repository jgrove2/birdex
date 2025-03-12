import Image from "next/image";
import testBird from "@/../public/birdSketchCanvas.jpg";
import styles from "./birdCard.module.css";

type BirdCardProps = {
  birdId: string;
  birdName: string;
  enabled: boolean;
};

export default function BirdCard({ birdId, birdName, enabled }: BirdCardProps) {
  return (
    <div className={styles.bird_card}>
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
      <div className={styles.bird_id}>
        {enabled ? <span>{birdName}</span> : <span>{birdId}</span>}
      </div>
    </div>
  );
}
