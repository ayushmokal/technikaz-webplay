/*
  # Product Tables Setup

  1. Tables Created
    - mobile_products
    - laptops
    
  2. Features
    - Full product specifications support
    - Image galleries
    - JSON fields for detailed specs
    - Automatic timestamps
    - Row Level Security
    
  3. Security
    - Public read access
    - Authenticated user CRUD access
    
  4. Indexes
    - Brand, price, and timestamp indexes for performance
*/

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create mobile_products table
DO $$ 
BEGIN
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

  -- Enable RLS
  ALTER TABLE mobile_products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;

EXCEPTION 
  WHEN others THEN 
    NULL;
END $$;

-- Create triggers for updated_at
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

-- Drop existing policies safely
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

-- Create new policies
DO $$ 
BEGIN
  -- Mobile Products Policies
  CREATE POLICY "Allow public read access for mobile_products"
    ON mobile_products FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Allow authenticated users to create mobile_products"
    ON mobile_products FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to update mobile_products"
    ON mobile_products FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to delete mobile_products"
    ON mobile_products FOR DELETE
    TO authenticated
    USING (true);

  -- Laptops Policies  
  CREATE POLICY "Allow public read access for laptops"
    ON laptops FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Allow authenticated users to create laptops"
    ON laptops FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to update laptops"
    ON laptops FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Allow authenticated users to delete laptops"
    ON laptops FOR DELETE
    TO authenticated
    USING (true);

EXCEPTION 
  WHEN others THEN NULL;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mobile_products_brand ON mobile_products(brand);
CREATE INDEX IF NOT EXISTS idx_mobile_products_price ON mobile_products(price);
CREATE INDEX IF NOT EXISTS idx_mobile_products_created_at ON mobile_products(created_at);

CREATE INDEX IF NOT EXISTS idx_laptops_brand ON laptops(brand);
CREATE INDEX IF NOT EXISTS idx_laptops_price ON laptops(price);
CREATE INDEX IF NOT EXISTS idx_laptops_created_at ON laptops(created_at);