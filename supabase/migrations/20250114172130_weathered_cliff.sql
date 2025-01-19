-- Modify comments table to require email for blog comments
ALTER TABLE comments 
  ADD COLUMN captcha_token text,
  ADD COLUMN verified boolean DEFAULT false,
  ALTER COLUMN user_email SET NOT NULL;

-- Add check constraint to require email for blog comments
ALTER TABLE comments
  ADD CONSTRAINT blog_comments_require_email 
  CHECK (
    (content_type = 'product') OR 
    (content_type = 'blog' AND user_email IS NOT NULL)
  );

-- Add check constraint to require captcha for blog comments
ALTER TABLE comments
  ADD CONSTRAINT blog_comments_require_captcha
  CHECK (
    (content_type = 'product') OR 
    (content_type = 'blog' AND captcha_token IS NOT NULL)
  );

-- Update policies
DROP POLICY IF EXISTS "Allow public insert access for comments" ON comments;

CREATE POLICY "Allow public insert access for comments"
  ON comments FOR INSERT
  TO public
  WITH CHECK (
    CASE 
      WHEN content_type = 'blog' THEN 
        user_email IS NOT NULL AND 
        captcha_token IS NOT NULL
      ELSE 
        true
    END
  );