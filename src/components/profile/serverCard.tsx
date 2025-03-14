import {
  getFollowersAction,
  getFollowingAction,
} from "@/lib/actions/following";
import "./numberCard.css";
import Link from "next/link";
export default async function ServerNumberCard({
  label,
  userId,
  href,
}: {
  label: string;
  userId: number;
  href: string;
}) {
  let number = 0;
  if (label === "Followers") {
    const followers = await getFollowersAction(userId);
    number = followers.length;
  } else if (label === "Following") {
    const following = await getFollowingAction(userId);
    number = following.length;
  }
  return (
    <Link className="number_card_container" href={href}>
      <span className="number_card_number">{number}</span>
      <span className="number_card_label">{label}</span>
    </Link>
  );
}
