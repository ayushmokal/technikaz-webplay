-- Drop existing policies safely
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access for expert_reviews" ON expert_reviews;
  DROP POLICY IF EXISTS "Allow authenticated users to create expert_reviews" ON expert_reviews;
  DROP POLICY IF EXISTS "Allow authenticated users to update expert_reviews" ON expert_reviews;
  DROP POLICY IF EXISTS "Allow authenticated users to delete expert_reviews" ON expert_reviews;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Drop existing foreign key constraints safely
DO $$ 
BEGIN
  ALTER TABLE expert_reviews DROP CONSTRAINT IF EXISTS expert_reviews_product_id_fkey;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Drop existing triggers safely
DO $$ 
BEGIN
  DROP TRIGGER IF EXISTS validate_expert_reviews_product_id ON expert_reviews;
  DROP TRIGGER IF EXISTS validate_product_ratings_product_id ON product_ratings;
  DROP TRIGGER IF EXISTS validate_product_reviews_product_id ON product_reviews;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Drop and recreate the validation function
DROP FUNCTION IF EXISTS validate_product_id() CASCADE;

CREATE OR REPLACE FUNCTION validate_product_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the product_id exists in either mobile_products or laptops
  IF EXISTS (
    SELECT 1 FROM mobile_products WHERE id = NEW.product_id
    UNION
    SELECT 1 FROM laptops WHERE id = NEW.product_id
  ) THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'Product ID does not exist in either mobile_products or laptops';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all relevant tables
CREATE TRIGGER validate_expert_reviews_product_id
  BEFORE INSERT OR UPDATE ON expert_reviews
  FOR EACH ROW
  EXECUTE FUNCTION validate_product_id();

CREATE TRIGGER validate_product_ratings_product_id
  BEFORE INSERT OR UPDATE ON product_ratings
  FOR EACH ROW
  EXECUTE FUNCTION validate_product_id();

CREATE TRIGGER validate_product_reviews_product_id
  BEFORE INSERT OR UPDATE ON product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION validate_product_id();

-- Update expert_reviews table constraints
ALTER TABLE expert_reviews 
  ALTER COLUMN rating SET NOT NULL,
  ALTER COLUMN author SET NOT NULL,
  ALTER COLUMN summary SET NOT NULL,
  ALTER COLUMN pros SET NOT NULL,
  ALTER COLUMN cons SET NOT NULL,
  ALTER COLUMN verdict SET NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_expert_reviews_product_id ON expert_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_expert_reviews_created_at ON expert_reviews(created_at);

-- Enable RLS safely
DO $$ 
BEGIN
  ALTER TABLE expert_reviews ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Create new policies safely
DO $$ 
BEGIN
  -- Only create policies if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'expert_reviews' 
    AND policyname = 'Allow public read access for expert_reviews'
  ) THEN
    CREATE POLICY "Allow public read access for expert_reviews"
      ON expert_reviews FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'expert_reviews' 
    AND policyname = 'Allow authenticated users to create expert_reviews'
  ) THEN
    CREATE POLICY "Allow authenticated users to create expert_reviews"
      ON expert_reviews FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'expert_reviews' 
    AND policyname = 'Allow authenticated users to update expert_reviews'
  ) THEN
    CREATE POLICY "Allow authenticated users to update expert_reviews"
      ON expert_reviews FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'expert_reviews' 
    AND policyname = 'Allow authenticated users to delete expert_reviews'
  ) THEN
    CREATE POLICY "Allow authenticated users to delete expert_reviews"
      ON expert_reviews FOR DELETE
      TO authenticated
      USING (true);
  END IF;
EXCEPTION WHEN others THEN NULL;
END $$;