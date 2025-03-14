export type User = {
  id: number;
  clerk_id: string;
  user_name: string;
  profile_picture: string;
  blurb: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SearchUser = {
  id: number;
  user_name: string;
  profile_picture: string;
  following: boolean;
};
