-- Drop existing tables if they exist
DO $$ 
BEGIN
  DROP TABLE IF EXISTS product_reviews CASCADE;
  DROP TABLE IF EXISTS product_ratings CASCADE;
  DROP TABLE IF EXISTS expert_reviews CASCADE;
  DROP TABLE IF EXISTS laptops CASCADE;
  DROP TABLE IF EXISTS mobile_products CASCADE;
EXCEPTION 
  WHEN others THEN NULL;
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';