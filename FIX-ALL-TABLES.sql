-- Fix for ALL tables - Run this in Supabase SQL Editor
-- This will allow the app to work without authentication

-- 1. Disable RLS on all tables
ALTER TABLE public.moods DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 2. Make user_id optional with default value for all tables
ALTER TABLE public.moods ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.moods ALTER COLUMN user_id SET DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE public.journals ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.journals ALTER COLUMN user_id SET DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE public.chat_conversations ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.chat_conversations ALTER COLUMN user_id SET DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE public.chat_messages ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.chat_messages ALTER COLUMN user_id SET DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE public.check_ins ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.check_ins ALTER COLUMN user_id SET DEFAULT '00000000-0000-0000-0000-000000000000';

-- 3. Drop foreign key constraints
ALTER TABLE public.moods DROP CONSTRAINT IF EXISTS moods_user_id_fkey;
ALTER TABLE public.journals DROP CONSTRAINT IF EXISTS journals_user_id_fkey;
ALTER TABLE public.chat_conversations DROP CONSTRAINT IF EXISTS chat_conversations_user_id_fkey;
ALTER TABLE public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_user_id_fkey;
ALTER TABLE public.check_ins DROP CONSTRAINT IF EXISTS check_ins_user_id_fkey;

-- Success! Now all features will work without authentication
