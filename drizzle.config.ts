// drizzle.config.js
import path from "path";
import * as fs from "fs";
import { defineConfig } from "drizzle-kit";

function getLocalD1Database() {
  try {
    const basePath = path.resolve("./.wrangler");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((file) => file.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error("No local D1 database found");
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./src/database/drizzle",
  dialect: "sqlite",
  schemaFilter: ["public"],
  verbose: true,
  strict: true,
  ...(process.env.NODE_ENV === "production"
    ? {
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
          token: process.env.CLOUDFLARE_D1_API_TOKEN!,
        },
      }
    : {
        dbCredentials: {
          url: getLocalD1Database(),
        },
      }),
});
