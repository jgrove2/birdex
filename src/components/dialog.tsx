"use client";
import { JSX, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import "./dialog.css";

export function Dialog({
  children,
  closeDialog,
}: {
  children: React.ReactNode;
  closeDialog: () => void;
}) {
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    if (showDialog === "y") {
      console.log("showDialog", showDialog);
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const handleClose = () => {
    closeDialog();
    dialogRef.current?.close();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog ref={dialogRef} onClose={handleClose} className="dialog">
        <button className="close_button" onClick={handleClose}>
          ×
        </button>
        {children}
      </dialog>
    ) : null;

  return dialog;
}
