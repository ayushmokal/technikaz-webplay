-- Create tables first
CREATE TABLE IF NOT EXISTS expert_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 10),
  author text NOT NULL,
  summary text NOT NULL,
  pros text[] NOT NULL,
  cons text[] NOT NULL,
  verdict text NOT NULL,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  user_name text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 5),
  review_text text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE expert_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access for expert_reviews"
  ON expert_reviews FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create expert_reviews"
  ON expert_reviews FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read access for product_ratings"
  ON product_ratings FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create product_ratings"
  ON product_ratings FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public read access for product_reviews"
  ON product_reviews FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create product_reviews"
  ON product_reviews FOR INSERT TO authenticated
  WITH CHECK (true);

-- Add foreign key constraints
ALTER TABLE expert_reviews
  ADD CONSTRAINT expert_reviews_product_id_fkey
  FOREIGN KEY (product_id)
  REFERENCES mobile_products(id)
  ON DELETE CASCADE;

ALTER TABLE product_ratings
  ADD CONSTRAINT product_ratings_product_id_fkey
  FOREIGN KEY (product_id)
  REFERENCES mobile_products(id)
  ON DELETE CASCADE;

ALTER TABLE product_reviews
  ADD CONSTRAINT product_reviews_product_id_fkey
  FOREIGN KEY (product_id)
  REFERENCES mobile_products(id)
  ON DELETE CASCADE;