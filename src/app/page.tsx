import styles from "./page.module.css";
import R2Image from "@/components/image"
import style from "./page.module.css"
export const runtime = "edge";

export default function Home() {
  return (
    <div>
      <R2Image width={1080} height={300} alt="Birdex" name="mainHeader-1.webp" className={style.banner_image} />
      <h1 className={styles.title}>Hello World</h1>
    </div>
  );
}
