-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL,
  content text NOT NULL,
  user_name text NOT NULL,
  parent_id uuid REFERENCES comments(id),
  upvotes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT comments_blog_id_fkey FOREIGN KEY (blog_id)
    REFERENCES blogs(id) ON DELETE CASCADE
);

-- Enable RLS for comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for comments
CREATE POLICY "Allow public read access for comments"
  ON comments FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create comments"
  ON comments FOR INSERT TO authenticated
  WITH CHECK (true);

-- Create function to calculate product rating
CREATE OR REPLACE FUNCTION calculate_product_rating(p_id uuid)
RETURNS TABLE (
  average_rating numeric,
  total_ratings bigint,
  rating_distribution integer[]
) AS $$
DECLARE
  avg_rating numeric;
  total_count bigint;
  dist integer[];
BEGIN
  -- Calculate average rating
  SELECT 
    COALESCE(AVG(rating), 0),
    COUNT(*)
  INTO 
    avg_rating,
    total_count
  FROM product_ratings
  WHERE product_id = p_id;

  -- Calculate distribution (1-5 stars)
  SELECT ARRAY[
    COUNT(*) FILTER (WHERE rating = 5)::integer,
    COUNT(*) FILTER (WHERE rating = 4)::integer,
    COUNT(*) FILTER (WHERE rating = 3)::integer,
    COUNT(*) FILTER (WHERE rating = 2)::integer,
    COUNT(*) FILTER (WHERE rating = 1)::integer
  ]
  INTO dist
  FROM product_ratings
  WHERE product_id = p_id;

  RETURN QUERY SELECT 
    ROUND(avg_rating::numeric, 1),
    total_count,
    dist;
END;
$$ LANGUAGE plpgsql;