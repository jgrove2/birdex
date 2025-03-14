import {
  getFollowersAction,
  getFollowingAction,
} from "@/lib/actions/following";
import "./numberCard.css";
export default async function ServerNumberCard({
  label,
  userId,
}: {
  label: string;
  userId: number;
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
    <div className="number_card_container">
      <span className="number_card_number">{number}</span>
      <span className="number_card_label">{label}</span>
    </div>
  );
}
