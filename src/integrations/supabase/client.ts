// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aijuvntqcvmokjalklob.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpanV2bnRxY3Ztb2tqYWxrbG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNjYwOTMsImV4cCI6MjA1Mjg0MjA5M30.xyHd77iwVwoGyxSbGo8kA1ND5PTJGSMfrxFSGBkY9Pk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);