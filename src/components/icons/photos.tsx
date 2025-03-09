import styles from "./icons.module.css";
export default function PhotosIcon() {
  return (
    <svg
      className={styles.svgIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M15 6a3 3 0 0 1 2.995 2.824L18 9v10a3 3 0 0 1-2.824 2.995L15 22H5a3 3 0 0 1-2.995-2.824L2 19V9a3 3 0 0 1 2.824-2.995L5 6h10Zm1 8.762-3.232 3.878a1 1 0 0 1-1.382.15l-.093-.083L9 16.415 5.414 20H15a1 1 0 0 0 .993-.883L16 19v-4.238ZM19 2a3 3 0 0 1 2.995 2.824L22 5v13a1 1 0 0 1-1.993.117L20 18V5a1 1 0 0 0-.883-.993L19 4H6a1 1 0 0 1-.117-1.993L6 2h13Zm-4 6H5a1 1 0 0 0-.993.883L4 9v9.584l4.293-4.291a1 1 0 0 1 1.32-.083l.094.083 2.225 2.224L16 11.636V9a1 1 0 0 0-.883-.993L15 8ZM6.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
      />
    </svg>
  );
}
