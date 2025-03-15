import "../profile.css";
import Image from "next/image";
import styles from "../profile.module.css";
import { getUserByIdAction } from "@/lib/actions/users";
import ServerProfileBlurb from "@/components/profile/serverProfileBlurb";
import ServerNumberCard from "@/components/profile/serverCard";
import { Dialog } from "@/components/dialog";
export const runtime = "edge";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const user = await getUserByIdAction(id);
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div className={styles.profile_container}>
      <Dialog redirect={`/profile/${id}`} searchToggle={false} />
      <div className={styles.profile_header}>
        <div className={"profile_header_content"}>
          <div className={"profile_header_content_main_container"}>
            <div
              className={
                "profile_header_content_main_container_image_container"
              }
            >
              <Image
                src={user.profile_picture}
                alt={"Profile Picture"}
                width={800}
                height={800}
                className={"profile_header_content_image"}
              />
            </div>
            <div className={"profile_header_content_text"}>
              <span className={styles.profile_header_content_text_name}>
                {user.user_name}
              </span>
              <div
                className={"profile_header_content_text_number_card_container"}
              >
                <ServerNumberCard
                  userId={user.id}
                  label={"Followers"}
                  key="followers"
                  href={`/profile/${id}?showDialog=y&type=followers`}
                />
                <ServerNumberCard
                  userId={user.id}
                  label={"Following"}
                  key="following"
                  href={`/profile/${id}?showDialog=y&type=following`}
                />
                <ServerNumberCard
                  userId={user.id}
                  label={"Birds"}
                  key="birds"
                  href={`/profile/${id}?showDialog=y&type=birds`}
                />
              </div>
            </div>
          </div>
          <ServerProfileBlurb initialBlurb={user.blurb} />
        </div>
      </div>
    </div>
  );
}
