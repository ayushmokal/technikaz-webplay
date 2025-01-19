-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  subcategory text,
  author text NOT NULL,
  image_url text,
  slug text NOT NULL UNIQUE,
  featured boolean DEFAULT false,
  featured_in_category boolean DEFAULT false,
  popular boolean DEFAULT false,
  popular_in_tech boolean DEFAULT false,
  popular_in_games boolean DEFAULT false,
  popular_in_entertainment boolean DEFAULT false,
  popular_in_stocks boolean DEFAULT false,
  popular_in_gadgets boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  view_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  average_rating numeric DEFAULT 0,
  meta_title text,
  meta_description text,
  meta_keywords text
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access for blogs"
  ON blogs FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create blogs"
  ON blogs FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blogs"
  ON blogs FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete blogs"
  ON blogs FOR DELETE TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_popular ON blogs(popular);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blogs
  SET view_count = view_count + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to increment share count
CREATE OR REPLACE FUNCTION increment_share_count(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blogs
  SET share_count = share_count + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;