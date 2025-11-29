-- Fix for Mood Tracking - Run this in Supabase SQL Editor

-- 1. Disable RLS on moods table to allow demo access
ALTER TABLE public.moods DISABLE ROW LEVEL SECURITY;

-- 2. Make user_id optional with a default value
ALTER TABLE public.moods ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.moods ALTER COLUMN user_id SET DEFAULT '00000000-0000-0000-0000-000000000000';

-- 3. Drop the foreign key constraint
ALTER TABLE public.moods DROP CONSTRAINT IF EXISTS moods_user_id_fkey;

-- Success! Now mood tracking will work without authentication
