// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""; // thay bằng project url
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""; // lấy từ Project > Settings > API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
