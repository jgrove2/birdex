"use client";
import { SearchUser } from "@/types/schema";
import Image from "next/image";
import { useTransition } from "react";
import { useState } from "react";
import "./socialModal.css";
import Link from "next/link";
import { useUserData } from "@/hooks/useUserData";
import { useUser } from "@clerk/nextjs";
import { useFollowing } from "@/hooks/useFollowing";
import { SquareLoader } from "react-spinners";
import { useSearch } from "@/hooks/useSearch";
import { useFollowers } from "@/hooks/useFollowers";
import { ClerkUser } from "@/types/clerk";
export function FollowingModal({
  userId,
  searchToggle,
}: {
  userId: number;
  searchToggle: boolean;
}) {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { data: userData, isPending: isUserDataPending } = useUserData(
    user as ClerkUser
  );
  const {
    data: followingData,
    isPending: isFollowingPending,
    refetch: refetchFollowing,
  } = useFollowing(userId);

  const {
    mutate: search,
    isPending: isSearchPending,
    data: searchResults,
  } = useSearch(searchTerm, userData?.id ?? 0);

  const handleFollow = async (followingId: number) => {
    try {
      const response = await fetch("/api/users/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, followingId }),
      });

      if (response.ok) {
        refetchFollowing();
        setSearchTerm("");
        setShowSearch(false);
      }
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async (followingId: number) => {
    try {
      const response = await fetch("/api/users/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, followingId }),
      });

      if (response.ok) {
        refetchFollowing();
        setSearchTerm("");
        setShowSearch(false);
      }
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <div className="dialog_container">
      <h2>Following</h2>
      {searchToggle && (
        <div>
          <input
            type="text"
            placeholder="Search following..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search_input"
          />
          <button
            className="search_button"
            onClick={() => {
              setShowSearch(true);
              search();
            }}
          >
            Search
          </button>
          <button
            className="search_button"
            onClick={() => {
              setSearchTerm("");
              setShowSearch(false);
              refetchFollowing();
            }}
          >
            Clear
          </button>
        </div>
      )}
      <div className="dialog_list">
        {(isFollowingPending && isUserDataPending) || isSearchPending ? (
          <SquareLoader />
        ) : showSearch ? (
          searchResults?.map((user: SearchUser) => (
            <div key={user.id} className="dialog_row">
              <Image
                src={user.profile_picture}
                alt={user.user_name}
                width={50}
                height={50}
              />
              <Link href={`/profile/${user.id}`}>{user.user_name}</Link>
              {!user.following && (
                <button
                  onClick={() => startTransition(() => handleFollow(user.id))}
                  disabled={isPending}
                >
                  {isPending ? "Following..." : "Follow"}
                </button>
              )}
              {user.following && (
                <button
                  onClick={() => startTransition(() => handleUnfollow(user.id))}
                  disabled={isPending}
                >
                  {isPending ? "Unfollowing..." : "Unfollow"}
                </button>
              )}
            </div>
          ))
        ) : (
          followingData?.map((user: SearchUser) => (
            <div key={user.id} className="dialog_row">
              <Image
                src={user.profile_picture}
                alt={user.user_name}
                width={50}
                height={50}
              />
              <Link href={`/profile/${user.id}`}>{user.user_name}</Link>
              {!user.following && (
                <button
                  onClick={() => startTransition(() => handleFollow(user.id))}
                  disabled={isPending}
                >
                  {isPending ? "Following..." : "Follow"}
                </button>
              )}
              {user.following && (
                <button
                  onClick={() => startTransition(() => handleUnfollow(user.id))}
                  disabled={isPending}
                >
                  {isPending ? "Unfollowing..." : "Unfollow"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function FollowersModal({ userId }: { userId: number }) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const { data: userData, isPending: isUserDataPending } = useUserData(
    user as ClerkUser
  );
  const {
    data: followersData,
    isPending: isFollowersPending,
    refetch: refetchFollowers,
  } = useFollowers(userData?.id ?? 0);

  const handleFollow = async (followingId: number) => {
    try {
      const response = await fetch("/api/users/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, followingId }),
      });

      if (response.ok) {
        refetchFollowers();
      }
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async (followingId: number) => {
    try {
      const response = await fetch("/api/users/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, followingId }),
      });

      if (response.ok) {
        refetchFollowers();
      }
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <div className="dialog_container">
      <h2>Followers</h2>
      <div className="dialog_list">
        {isFollowersPending && isUserDataPending ? (
          <SquareLoader />
        ) : (
          followersData?.map((user: SearchUser) => (
            <div key={user.id} className="dialog_row">
              <Image
                src={user.profile_picture}
                alt={user.user_name}
                width={50}
                height={50}
              />
              <Link href={`/profile/${user.id}`}>{user.user_name}</Link>
              {!user.following && (
                <button
                  onClick={() => startTransition(() => handleFollow(user.id))}
                  disabled={isPending}
                >
                  {isPending ? "Following..." : "Follow"}
                </button>
              )}
              {user.following && (
                <button
                  onClick={() => startTransition(() => handleUnfollow(user.id))}
                  disabled={isPending}
                >
                  {isPending ? "Unfollowing..." : "Unfollow"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
