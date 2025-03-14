import styles from "./icons.module.css";

export const DragHandle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={800}
      fill="none"
      viewBox="0 0 24 24"
      className={styles.dragHandleSvg}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M4 10h16M4 14h16"
      />
    </svg>
  );
};
