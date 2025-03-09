import styles from "./icons.module.css";
export default function HomeIcon() {
  return (
    <svg
      className={styles.svgIcon}
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={800}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M3.012 10.981 3 11h2v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9h2a1 1 0 0 0 .555-1.832l-9-6a1 1 0 0 0-1.11 0l-9 6a1 1 0 0 0-.277 1.387.98.98 0 0 0 .844.426ZM10 14a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h-4Z" />
    </svg>
  );
}
