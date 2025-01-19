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
  
  DROP POLICY IF EXISTS "Allow public read access for expert_reviews" ON expert_reviews;
  DROP POLICY IF EXISTS "Allow authenticated users to create expert_reviews" ON expert_reviews;
  
  DROP POLICY IF EXISTS "Allow public read access for product_ratings" ON product_ratings;
  DROP POLICY IF EXISTS "Allow authenticated users to create product_ratings" ON product_ratings;
  
  DROP POLICY IF EXISTS "Allow public read access for product_reviews" ON product_reviews;
  DROP POLICY IF EXISTS "Allow authenticated users to create product_reviews" ON product_reviews;
EXCEPTION 
  WHEN others THEN NULL;
END $$;