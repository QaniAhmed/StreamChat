import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
// Create a single supabase client for interacting with your database
export const DB = createClient(
  process.env.supabaseUrl,
  process.env.supabaseKey,
);

async function testConnection() {
  const { data, error } = await DB.from("users").select("*").limit(1);

  if (error) {
    console.error("wrong to connect to DB", error.message);
  } else {
    console.log("connection successfully", data);
  }
}

testConnection();
