/*
  # Initial Schema Setup
  
  1. New Tables
    - mobile_products: Store mobile phone product details
    - laptops: Store laptop product details
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated user CRUD operations
*/

-- Create mobile_products table if it doesn't exist
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

-- Create laptops table if it doesn't exist
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

-- Enable RLS
DO $$ 
BEGIN
  ALTER TABLE mobile_products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;
EXCEPTION 
  WHEN others THEN NULL;
END $$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access for mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to create mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to update mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to delete mobile_products" ON mobile_products;
  
  DROP POLICY IF EXISTS "Allow public read access for laptops" ON laptops;
  DROP POLICY IF EXISTS "Allow authenticated users to create laptops" ON laptops;
  DROP POLICY IF EXISTS "Allow authenticated users to update laptops" ON laptops;
  DROP POLICY IF EXISTS "Allow authenticated users to delete laptops" ON laptops;
EXCEPTION 
  WHEN others THEN NULL;
END $$;

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