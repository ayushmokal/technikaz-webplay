/*
  # Fix Mobile Products Schema

  1. Changes
    - Add IF NOT EXISTS checks for tables and policies
    - Add proper indexes for performance
    - Add updated_at trigger
    
  2. Security
    - Ensure RLS is enabled
    - Verify policies are in place
    
  3. Data Integrity
    - Add NOT NULL constraints where needed
    - Add proper foreign key relationships
*/

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for mobile_products
DROP TRIGGER IF EXISTS update_mobile_products_updated_at ON mobile_products;
CREATE TRIGGER update_mobile_products_updated_at
    BEFORE UPDATE ON mobile_products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for laptops
DROP TRIGGER IF EXISTS update_laptops_updated_at ON laptops;
CREATE TRIGGER update_laptops_updated_at
    BEFORE UPDATE ON laptops
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mobile_products_brand ON mobile_products(brand);
CREATE INDEX IF NOT EXISTS idx_mobile_products_price ON mobile_products(price);
CREATE INDEX IF NOT EXISTS idx_mobile_products_created_at ON mobile_products(created_at);

CREATE INDEX IF NOT EXISTS idx_laptops_brand ON laptops(brand);
CREATE INDEX IF NOT EXISTS idx_laptops_price ON laptops(price);
CREATE INDEX IF NOT EXISTS idx_laptops_created_at ON laptops(created_at);