-- Create comments table if it doesn't exist
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('blog', 'product')),
  content text NOT NULL,
  user_name text NOT NULL DEFAULT 'Anonymous',
  user_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('blog', 'product')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
DO $$ 
BEGIN
  ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
  ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Drop existing policies safely
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access for comments" ON comments;
  DROP POLICY IF EXISTS "Allow public insert access for comments" ON comments;
  DROP POLICY IF EXISTS "Allow public read access for reviews" ON reviews;
  DROP POLICY IF EXISTS "Allow public insert access for reviews" ON reviews;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Create policies
DO $$ 
BEGIN
  -- Create policies for comments
  CREATE POLICY "Allow public read access for comments"
    ON comments FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Allow public insert access for comments"
    ON comments FOR INSERT
    TO public
    WITH CHECK (true);

  -- Create policies for reviews
  CREATE POLICY "Allow public read access for reviews"
    ON reviews FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Allow public insert access for reviews"
    ON reviews FOR INSERT
    TO public
    WITH CHECK (true);
EXCEPTION WHEN others THEN NULL;
END $$;

-- Create indexes safely
DO $$ 
BEGIN
  CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_id, content_type);
  CREATE INDEX IF NOT EXISTS idx_reviews_content ON reviews(content_id, content_type);
  CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
  CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);
EXCEPTION WHEN others THEN NULL;
END $$;

-- Create or replace function to calculate average rating
CREATE OR REPLACE FUNCTION calculate_average_rating(content_id uuid, content_type text)
RETURNS numeric AS $$
DECLARE
  avg_rating numeric;
BEGIN
  SELECT AVG(rating)::numeric(3,1)
  INTO avg_rating
  FROM reviews
  WHERE reviews.content_id = calculate_average_rating.content_id
  AND reviews.content_type = calculate_average_rating.content_type;
  
  RETURN COALESCE(avg_rating, 0);
END;
$$ LANGUAGE plpgsql;