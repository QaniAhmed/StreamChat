import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

export const DB = createClient(
  process.env.supabaseUrl,
  process.env.supabaseKey,
);
