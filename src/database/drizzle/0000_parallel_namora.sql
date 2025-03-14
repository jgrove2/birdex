CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"user_name" text NOT NULL,
	"blurb" text NOT NULL,
	"profile_picture" text NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
