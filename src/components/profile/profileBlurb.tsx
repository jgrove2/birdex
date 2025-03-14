"use client";
import "./profileBlurb.css";
import { useEffect, useState } from "react";

export default function ProfileBlurb({
  initialBlurb,
  refetchData,
  updateBlurb,
}: {
  initialBlurb: string;
  refetchData: () => void;
  updateBlurb: (blurb: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempBlurb, setTempBlurb] = useState(initialBlurb || "");

  useEffect(() => {
    console.log(initialBlurb);
  }, [initialBlurb]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateBlurb(tempBlurb);
    refetchData();
  };

  const handleCancel = () => {
    setTempBlurb(initialBlurb);
    setIsEditing(false);
  };

  return (
    <div className="profile_blurb_container">
      {!isEditing ? (
        <div className="profile_blurb_text_container">
          <span>{initialBlurb || "Add a blurb about yourself..."}</span>
          <button onClick={handleEdit} className="profile_blurb_button">
            Edit
          </button>
        </div>
      ) : (
        <div className="profile_blurb_textarea_container">
          <textarea
            value={tempBlurb}
            onChange={(e) => setTempBlurb(e.target.value)}
            className="profile_blurb_textarea"
            placeholder="Write something about yourself..."
          />
          <div className="profile_blurb_button_container">
            <button onClick={handleCancel} className="profile_blurb_button">
              Cancel
            </button>
            <button onClick={handleSave} className="profile_blurb_button">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
