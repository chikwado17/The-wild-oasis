import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://figmrhmkgvvrwmybzhmf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ21yaG1rZ3Z2cndteWJ6aG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzU3OTUsImV4cCI6MjAyODg1MTc5NX0.xfHzgmzjR3c_DzD-RAcRc8L0YMk9hG4kUK7GMmE1Dvs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
