import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import dayjs from "dayjs";
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  clerk_id: text("clerk_id").notNull(),
  user_name: text("user_name").notNull(),
  blurb: text("blurb").notNull(),
  profile_picture: text("profile_picture").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
  }).$defaultFn(() => dayjs().toDate()),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
  })
    .$defaultFn(() => dayjs().toDate())
    .$onUpdateFn(() => dayjs().toDate()),
});

export const followingTable = pgTable("following", {
  user_id: serial("user_id").references(() => usersTable.id),
  following_id: serial("following_id").references(() => usersTable.id),
  createdAt: timestamp("createdAt", {
    mode: "date",
  }).$defaultFn(() => dayjs().toDate()),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
  }).$defaultFn(() => dayjs().toDate()),
});
