-- Run this in your Supabase SQL Editor to add survey columns
-- Dashboard: https://supabase.com/dashboard/project/hwfcwbhmmmlmoryppngy/sql/new

-- Add survey columns to challenge_subscribers table
ALTER TABLE public.challenge_subscribers 
ADD COLUMN IF NOT EXISTS interested_day TEXT,
ADD COLUMN IF NOT EXISTS ai_struggle TEXT,
ADD COLUMN IF NOT EXISTS survey_completed_at TIMESTAMPTZ;

-- Create index for analytics on interested_day
CREATE INDEX IF NOT EXISTS idx_challenge_subscribers_interested_day 
ON public.challenge_subscribers(interested_day);

-- Useful analytics queries:

-- See which days are most popular
-- SELECT interested_day, COUNT(*) as count 
-- FROM challenge_subscribers 
-- WHERE interested_day IS NOT NULL 
-- GROUP BY interested_day 
-- ORDER BY count DESC;

-- See all AI struggles (the gold mine!)
-- SELECT ai_struggle, created_at 
-- FROM challenge_subscribers 
-- WHERE ai_struggle IS NOT NULL AND ai_struggle != ''
-- ORDER BY created_at DESC;

-- Survey completion rate
-- SELECT 
--   COUNT(*) as total_subscribers,
--   COUNT(survey_completed_at) as completed_survey,
--   ROUND(COUNT(survey_completed_at)::numeric / COUNT(*)::numeric * 100, 1) as completion_rate
-- FROM challenge_subscribers;
