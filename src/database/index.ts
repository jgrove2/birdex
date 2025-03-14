import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Create a postgres connection
const client = postgres(process.env.DATABASE_URL!);

// Create and export the database instance
const database = drizzle(client, { schema, logger: true });

export default database;
