import { GitHub } from "arctic";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import { db } from "../db";
import * as table from "../db/schema";
import { eq } from "drizzle-orm";

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, null);

export async function getUserFromGitHubId(githubId: number) {
    return db.select().from(table.user).where(eq(table.user.githubId, githubId)).limit(1);
}