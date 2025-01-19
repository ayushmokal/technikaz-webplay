/*
  # Create Product Tables

  1. New Tables
    - mobile_products
      - Core mobile phone product information
      - Specifications and details
      - Image handling
    - laptops
      - Core laptop product information
      - Specifications and details
      - Image handling
    - expert_reviews
      - Expert product reviews
      - Rating system
      - Pros and cons

  2. Security
    - Enable RLS on all tables
    - Public read access
    - Authenticated write access
*/

-- Create mobile_products table
CREATE TABLE IF NOT EXISTS mobile_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text,
  model_name text,
  price numeric NOT NULL,
  display_specs text NOT NULL,
  processor text NOT NULL,
  ram text,
  storage text,
  battery text NOT NULL,
  camera text NOT NULL,
  chipset text,
  charging_specs text,
  resolution text,
  screen_size text,
  color text,
  os text,
  image_url text,
  gallery_images text[],
  camera_details jsonb,
  sensor_specs jsonb,
  network_specs jsonb,
  general_specs jsonb,
  design_specs jsonb,
  display_details jsonb,
  performance_specs jsonb,
  multimedia_specs jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create laptops table
CREATE TABLE IF NOT EXISTS laptops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  model_name text,
  price numeric NOT NULL,
  display_specs text NOT NULL,
  processor text NOT NULL,
  ram text NOT NULL,
  storage text NOT NULL,
  battery text NOT NULL,
  graphics text,
  ports text,
  color text,
  os text,
  image_url text,
  gallery_images text[],
  connectivity_specs jsonb,
  design_specs jsonb,
  display_details jsonb,
  performance_specs jsonb,
  multimedia_specs jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create expert_reviews table
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

-- Enable Row Level Security
ALTER TABLE mobile_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for mobile_products
CREATE POLICY "Allow public read access for mobile_products"
  ON mobile_products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create mobile_products"
  ON mobile_products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update mobile_products"
  ON mobile_products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete mobile_products"
  ON mobile_products
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for laptops
CREATE POLICY "Allow public read access for laptops"
  ON laptops
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create laptops"
  ON laptops
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update laptops"
  ON laptops
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete laptops"
  ON laptops
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for expert_reviews
CREATE POLICY "Allow public read access for expert_reviews"
  ON expert_reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create expert_reviews"
  ON expert_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update expert_reviews"
  ON expert_reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete expert_reviews"
  ON expert_reviews
  FOR DELETE
  TO authenticated
  USING (true);

-- Add foreign key constraint for expert_reviews
ALTER TABLE expert_reviews
  ADD CONSTRAINT expert_reviews_product_id_fkey
  FOREIGN KEY (product_id)
  REFERENCES mobile_products(id)
  ON DELETE CASCADE;