-- Create ratings table if it doesn't exist
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access for ratings" ON ratings;
DROP POLICY IF EXISTS "Allow authenticated users to create ratings" ON ratings;

-- Create policies
CREATE POLICY "Allow public read access for ratings"
  ON ratings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_ratings_blog_id ON ratings(blog_id);

-- Create function to handle ratings table creation
CREATE OR REPLACE FUNCTION create_ratings_table()
RETURNS void AS $$
BEGIN
  -- The table and policies are already created above,
  -- this function now just serves as a check
  -- and will do nothing if the table exists
  RETURN;
END;
$$ LANGUAGE plpgsql;