/*
  # Fix Mobile Products Policies
  
  1. Changes
    - Add safe policy creation with existence checks
    - Handle duplicate policy errors
    - Ensure idempotent operations
*/

DO $$ 
BEGIN
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

  -- Enable RLS if not already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'mobile_products' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE mobile_products ENABLE ROW LEVEL SECURITY;
  END IF;

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow public read access for mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to create mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to update mobile_products" ON mobile_products;
  DROP POLICY IF EXISTS "Allow authenticated users to delete mobile_products" ON mobile_products;

  -- Create new policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mobile_products' 
    AND policyname = 'Allow public read access for mobile_products'
  ) THEN
    CREATE POLICY "Allow public read access for mobile_products"
      ON mobile_products
      FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mobile_products' 
    AND policyname = 'Allow authenticated users to create mobile_products'
  ) THEN
    CREATE POLICY "Allow authenticated users to create mobile_products"
      ON mobile_products
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mobile_products' 
    AND policyname = 'Allow authenticated users to update mobile_products'
  ) THEN
    CREATE POLICY "Allow authenticated users to update mobile_products"
      ON mobile_products
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mobile_products' 
    AND policyname = 'Allow authenticated users to delete mobile_products'
  ) THEN
    CREATE POLICY "Allow authenticated users to delete mobile_products"
      ON mobile_products
      FOR DELETE
      TO authenticated
      USING (true);
  END IF;

  -- Insert sample data if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM mobile_products WHERE id = '546c92ec-f10a-444e-a7d6-c5bc46369774') THEN
    INSERT INTO mobile_products (
      id,
      name,
      brand,
      price,
      display_specs,
      processor,
      ram,
      storage,
      battery,
      camera,
      chipset,
      charging_specs,
      resolution,
      screen_size,
      color,
      os,
      image_url,
      created_at,
      updated_at,
      camera_details,
      network_specs,
      general_specs
    ) VALUES (
      '546c92ec-f10a-444e-a7d6-c5bc46369774',
      'Pixel 6a',
      'Google',
      27000.00,
      'OLED Display',
      'Google Tensor',
      '6GB',
      '128GB',
      '4410 mAh',
      '12.2 MP (Wide) + 12 MP (Ultrawide)',
      'Google Tensor',
      '18W Fast Charging',
      '1080 x 2400 pixels',
      '6.1 inches',
      'Charcoal',
      'Android 12',
      'https://ioqqpuhichghrcgvkhqh.supabase.co/storage/v1/object/public/gadget-images/0.15271801849238908.webp',
      '2025-01-12 18:33:32.222967+00',
      '2025-01-12 18:33:32.222967+00',
      jsonb_build_object(
        'main_features', '12.2 MP (Wide) + 12 MP (Ultrawide)',
        'main_video', '4K@30/60fps',
        'selfie_features', '8 MP',
        'selfie_video', '1080p@30fps'
      ),
      jsonb_build_object(
        'technology', 'GSM / HSPA / LTE / 5G',
        '2g', 'GSM 850 / 900 / 1800 / 1900',
        '3g', 'HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100',
        '4g', 'LTE',
        '5g', 'SA/NSA',
        'speed', 'HSPA 42.2/5.76 Mbps, LTE-A, 5G'
      ),
      jsonb_build_object(
        'dimensions', '152.2 x 71.8 x 8.9 mm',
        'build', 'Glass front (Gorilla Glass 3), aluminum frame',
        'sim', 'Nano-SIM and/or eSIM',
        'protection', 'IP67 dust/water resistant'
      )
    );
  END IF;
END $$;