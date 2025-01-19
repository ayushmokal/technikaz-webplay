/*
  # Database Schema Update
  
  1. Tables
    - Safely create tables if they don't exist
    - Add IF NOT EXISTS to all table creation
    
  2. Security
    - Safe RLS enabling with error handling
    - Safe policy creation with error handling
    
  3. Performance
    - Safe index creation
    - Safe trigger creation
*/

-- Create tables if they don't exist
DO $$ 
BEGIN
  -- Create tables only if they don't exist
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

EXCEPTION WHEN others THEN 
  RAISE NOTICE 'Error creating tables: %', SQLERRM;
END $$;

-- Create or replace trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Enable RLS and create triggers safely
DO $$ 
BEGIN
  -- Enable RLS
  ALTER TABLE mobile_products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;
  ALTER TABLE expert_reviews ENABLE ROW LEVEL SECURITY;
  ALTER TABLE product_ratings ENABLE ROW LEVEL SECURITY;
  ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

  -- Create triggers
  DROP TRIGGER IF EXISTS update_mobile_products_updated_at ON mobile_products;
  CREATE TRIGGER update_mobile_products_updated_at
      BEFORE UPDATE ON mobile_products
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();

  DROP TRIGGER IF EXISTS update_laptops_updated_at ON laptops;
  CREATE TRIGGER update_laptops_updated_at
      BEFORE UPDATE ON laptops
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();

EXCEPTION WHEN others THEN 
  RAISE NOTICE 'Error setting up RLS and triggers: %', SQLERRM;
END $$;

-- Create policies safely
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Allow public read access for mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to create mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to update mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to delete mobile_products" ON mobile_products;
  
  -- Create new policies
  CREATE POLICY "Allow public read access for mobile_products"
    ON mobile_products FOR SELECT TO public
    USING (true);

  CREATE POLICY "Allow authenticated users to create mobile_products"
    ON mobile_products FOR INSERT TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to update mobile_products"
    ON mobile_products FOR UPDATE TO authenticated
    USING (true) WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to delete mobile_products"
    ON mobile_products FOR DELETE TO authenticated
    USING (true);

EXCEPTION WHEN others THEN 
  RAISE NOTICE 'Error creating mobile_products policies: %', SQLERRM;
END $$;

-- Create laptop policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access for laptops" ON laptops;
  DROP POLICY IF EXISTS "Allow authenticated users to create laptops" ON laptops;
  DROP POLICY IF EXISTS "Allow authenticated users to update laptops" ON laptops;
  DROP POLICY IF EXISTS "Allow authenticated users to delete laptops" ON laptops;

  CREATE POLICY "Allow public read access for laptops"
    ON laptops FOR SELECT TO public
    USING (true);

  CREATE POLICY "Allow authenticated users to create laptops"
    ON laptops FOR INSERT TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to update laptops"
    ON laptops FOR UPDATE TO authenticated
    USING (true) WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to delete laptops"
    ON laptops FOR DELETE TO authenticated
    USING (true);

EXCEPTION WHEN others THEN 
  RAISE NOTICE 'Error creating laptop policies: %', SQLERRM;
END $$;

-- Create review and rating policies
DO $$ 
BEGIN
  -- Expert reviews
  DROP POLICY IF EXISTS "Allow public read access for expert_reviews" ON expert_reviews;
  DROP POLICY IF EXISTS "Allow authenticated users to create expert_reviews" ON expert_reviews;

  CREATE POLICY "Allow public read access for expert_reviews"
    ON expert_reviews FOR SELECT TO public
    USING (true);

  CREATE POLICY "Allow authenticated users to create expert_reviews"
    ON expert_reviews FOR INSERT TO authenticated
    WITH CHECK (true);

  -- Product ratings
  DROP POLICY IF EXISTS "Allow public read access for product_ratings" ON product_ratings;
  DROP POLICY IF EXISTS "Allow authenticated users to create product_ratings" ON product_ratings;

  CREATE POLICY "Allow public read access for product_ratings"
    ON product_ratings FOR SELECT TO public
    USING (true);

  CREATE POLICY "Allow authenticated users to create product_ratings"
    ON product_ratings FOR INSERT TO authenticated
    WITH CHECK (true);

  -- Product reviews
  DROP POLICY IF EXISTS "Allow public read access for product_reviews" ON product_reviews;
  DROP POLICY IF EXISTS "Allow authenticated users to create product_reviews" ON product_reviews;

  CREATE POLICY "Allow public read access for product_reviews"
    ON product_reviews FOR SELECT TO public
    USING (true);

  CREATE POLICY "Allow authenticated users to create product_reviews"
    ON product_reviews FOR INSERT TO authenticated
    WITH CHECK (true);

EXCEPTION WHEN others THEN 
  RAISE NOTICE 'Error creating review policies: %', SQLERRM;
END $$;

-- Create indexes safely
DO $$
BEGIN
  CREATE INDEX IF NOT EXISTS idx_mobile_products_brand ON mobile_products(brand);
  CREATE INDEX IF NOT EXISTS idx_mobile_products_price ON mobile_products(price);
  CREATE INDEX IF NOT EXISTS idx_mobile_products_created_at ON mobile_products(created_at);

  CREATE INDEX IF NOT EXISTS idx_laptops_brand ON laptops(brand);
  CREATE INDEX IF NOT EXISTS idx_laptops_price ON laptops(price);
  CREATE INDEX IF NOT EXISTS idx_laptops_created_at ON laptops(created_at);

EXCEPTION WHEN others THEN 
  RAISE NOTICE 'Error creating indexes: %', SQLERRM;
END $$;

-- Add foreign key constraints safely
DO $$ 
BEGIN
  ALTER TABLE expert_reviews
    DROP CONSTRAINT IF EXISTS expert_reviews_product_id_fkey,
    ADD CONSTRAINT expert_reviews_product_id_fkey
    FOREIGN KEY (product_id)
    REFERENCES mobile_products(id)
    ON DELETE CASCADE;

  ALTER TABLE product_ratings
    DROP CONSTRAINT IF EXISTS product_ratings_product_id_fkey,
    ADD CONSTRAINT product_ratings_product_id_fkey
    FOREIGN KEY (product_id)
    REFERENCES mobile_products(id)
    ON DELETE CASCADE;

  ALTER TABLE product_reviews
    DROP CONSTRAINT IF EXISTS product_reviews_product_id_fkey,
    ADD CONSTRAINT product_reviews_product_id_fkey
    FOREIGN KEY (product_id)
    REFERENCES mobile_products(id)
    ON DELETE CASCADE;

EXCEPTION WHEN others THEN 
  RAISE NOTICE 'Error setting up foreign keys: %', SQLERRM;
END $$;