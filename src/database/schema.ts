import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import dayjs from "dayjs";

export const profileTable = sqliteTable("profile", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerk_id: text("clerk_id").notNull(),
  user_name: text("user_name").notNull(),
  blurb: text("blurb").notNull(),
  profile_picture: text("profile_picture").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() =>
    dayjs().toDate()
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$defaultFn(() => dayjs().toDate())
    .$onUpdateFn(() => dayjs().toDate()),
});

export const followingTable = sqliteTable("following", {
  user_id: integer("user_id").references(() => profileTable.id),
  following_id: integer("following_id").references(() => profileTable.id),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() =>
    dayjs().toDate()
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() =>
    dayjs().toDate()
  ),
});
