import "./profileBlurb.css";

export default function ServerProfileBlurb({
  initialBlurb,
}: {
  initialBlurb: string;
}) {
  return (
    <div className="profile_blurb_container">
      <div className="profile_blurb_text_container">
        <span>{initialBlurb || "Add a blurb about yourself..."}</span>
      </div>
    </div>
  );
}
