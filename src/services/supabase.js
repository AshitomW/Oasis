import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://savllzavmlfgfuimrlnq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhdmxsemF2bWxmZ2Z1aW1ybG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4Mzk3MjMsImV4cCI6MjA1MTQxNTcyM30.tKyS_4N1EGhaVuXZ2DMMXVw9Mdy4nZovaDStKvHu6TA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
