import { SignOutButton } from "@clerk/nextjs";

export const runtime = "edge";

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <SignOutButton />
    </div>
  );
}
