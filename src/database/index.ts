import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const database = drizzle(process.env.DATABASE!, { schema });
