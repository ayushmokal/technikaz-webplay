/*
  # Add Ratings System Tables

  1. New Tables
    - `ratings`
      - `id` (uuid, primary key)
      - `blog_id` (uuid, foreign key to blogs)
      - `rating` (numeric, 1-5)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on ratings table
    - Add policies for public read and authenticated write access
*/

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

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

-- Create trigger for updated_at
CREATE TRIGGER update_ratings_updated_at
  BEFORE UPDATE ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate average rating
CREATE OR REPLACE FUNCTION calculate_blog_rating(blog_id uuid)
RETURNS numeric AS $$
DECLARE
  avg_rating numeric;
BEGIN
  SELECT AVG(rating)
  INTO avg_rating
  FROM ratings
  WHERE ratings.blog_id = $1;
  
  -- Update the blog's average_rating
  UPDATE blogs
  SET average_rating = COALESCE(avg_rating, 0)
  WHERE id = blog_id;
  
  RETURN COALESCE(avg_rating, 0);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update blog rating on rating changes
CREATE OR REPLACE FUNCTION update_blog_rating()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_blog_rating(NEW.blog_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_rating_on_rating_change
  AFTER INSERT OR UPDATE OR DELETE ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_rating();