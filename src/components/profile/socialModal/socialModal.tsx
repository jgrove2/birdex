"use client";
import { User } from "@/types/schema";
import Image from "next/image";
import { useEffect, useState } from "react";

export function FollowingModal({ userId }: { userId: number }) {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await fetch(`/following?userId=${userId}`);
      const data = await response.json();
      setFollowers(data);
    };
    fetchFollowers();
  }, [userId]);

  return (
    <div>
      <div>
        {followers.map((user: User) => (
          <div key={user.id}>
            <Image
              src={user.profilePicture}
              alt={user.user_name}
              width={50}
              height={50}
            />
            <span>{user.user_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FollowersModal({ userId }: { userId: number }) {
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await fetch(`/followers?userId=${userId}`);
      const data = await response.json();
      setFollowers(data);
    };
    fetchFollowers();
  }, [userId]);

  return (
    <div>
      <div>
        {followers.map((user: User) => (
          <div key={user.id}>
            <Image
              src={user.profilePicture}
              alt={user.user_name}
              width={50}
              height={50}
            />
            <span>{user.user_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
