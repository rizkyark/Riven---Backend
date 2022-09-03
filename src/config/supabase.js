const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://tcsmgcjekkeqsoojadir.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjc21nY2pla2tlcXNvb2phZGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwODc2ODIsImV4cCI6MTk3NzY2MzY4Mn0.LC6TLa0G6gOr_g4-Roch5XKa9dVU8baFV989ssapNa4";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
