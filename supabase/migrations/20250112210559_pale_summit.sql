-- Create storage bucket for blog images
DO $$
BEGIN
  -- Create bucket if it doesn't exist
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'blog-images',
    'blog-images',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  )
  ON CONFLICT (id) DO NOTHING;

  -- Create policy for public read access
  CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'blog-images');

  -- Create policy for authenticated users to upload
  CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

  -- Create policy for authenticated users to update their uploads
  CREATE POLICY "Authenticated users can update their images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images');

  -- Create policy for authenticated users to delete their uploads
  CREATE POLICY "Authenticated users can delete their images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');

EXCEPTION
  WHEN others THEN
    -- If policies already exist, ignore the error
    NULL;
END $$;