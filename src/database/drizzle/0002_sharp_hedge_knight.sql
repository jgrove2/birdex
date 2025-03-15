CREATE TABLE `following` (
	`user_id` integer,
	`following_id` integer,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clerk_id` text NOT NULL,
	`user_name` text NOT NULL,
	`blurb` text NOT NULL,
	`profile_picture` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);
