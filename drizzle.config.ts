// drizzle.config.js
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./src/database/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  schemaFilter: ["public"],
  verbose: true,
  strict: true,
});
