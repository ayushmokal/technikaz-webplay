-- Drop existing foreign key constraints
ALTER TABLE product_ratings DROP CONSTRAINT IF EXISTS product_ratings_product_id_fkey;
ALTER TABLE product_reviews DROP CONSTRAINT IF EXISTS product_reviews_product_id_fkey;
ALTER TABLE expert_reviews DROP CONSTRAINT IF EXISTS expert_reviews_product_id_fkey;

-- Create a function to validate product ID
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

-- Create triggers to validate product_id
DROP TRIGGER IF EXISTS validate_product_ratings_product_id ON product_ratings;
CREATE TRIGGER validate_product_ratings_product_id
  BEFORE INSERT OR UPDATE ON product_ratings
  FOR EACH ROW
  EXECUTE FUNCTION validate_product_id();

DROP TRIGGER IF EXISTS validate_product_reviews_product_id ON product_reviews;
CREATE TRIGGER validate_product_reviews_product_id
  BEFORE INSERT OR UPDATE ON product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION validate_product_id();

DROP TRIGGER IF EXISTS validate_expert_reviews_product_id ON expert_reviews;
CREATE TRIGGER validate_expert_reviews_product_id
  BEFORE INSERT OR UPDATE ON expert_reviews
  FOR EACH ROW
  EXECUTE FUNCTION validate_product_id();

-- Update calculate_product_rating function to check both tables
CREATE OR REPLACE FUNCTION calculate_product_rating(p_id uuid)
RETURNS TABLE (
  average_rating numeric,
  total_ratings bigint,
  rating_distribution integer[]
) AS $$
DECLARE
  avg_rating numeric;
  total_count bigint;
  dist integer[];
BEGIN
  -- Check if product exists in either table
  IF NOT EXISTS (
    SELECT 1 FROM mobile_products WHERE id = p_id
    UNION
    SELECT 1 FROM laptops WHERE id = p_id
  ) THEN
    RAISE EXCEPTION 'Product not found';
  END IF;

  -- Calculate average rating
  SELECT 
    COALESCE(AVG(rating), 0),
    COUNT(*)
  INTO 
    avg_rating,
    total_count
  FROM product_ratings
  WHERE product_id = p_id;

  -- Calculate distribution (1-5 stars)
  SELECT ARRAY[
    COUNT(*) FILTER (WHERE rating = 5)::integer,
    COUNT(*) FILTER (WHERE rating = 4)::integer,
    COUNT(*) FILTER (WHERE rating = 3)::integer,
    COUNT(*) FILTER (WHERE rating = 2)::integer,
    COUNT(*) FILTER (WHERE rating = 1)::integer
  ]
  INTO dist
  FROM product_ratings
  WHERE product_id = p_id;

  RETURN QUERY SELECT 
    ROUND(avg_rating::numeric, 1),
    total_count,
    dist;
END;
$$ LANGUAGE plpgsql;