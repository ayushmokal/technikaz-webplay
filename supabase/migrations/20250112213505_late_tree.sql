-- Add new columns to mobile_products table safely
DO $$ 
BEGIN
  -- Launch Details
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS announced text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS status text;

  -- Platform
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS cpu_details text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS gpu_details text;

  -- Memory
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS card_slot boolean DEFAULT false;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS memory_type text;

  -- Display
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_type text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_size text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_resolution text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_protection text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_features jsonb;

  -- Camera
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS main_camera_specs jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS main_camera_features jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS main_camera_video jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_specs jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_features jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_video jsonb;

  -- Body
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS dimensions text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS weight text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS build_material text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS sim_type text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS protection_rating text;

  -- Battery
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS battery_type text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS battery_charging jsonb;

  -- Communications
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS wlan text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bluetooth text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS nfc boolean DEFAULT false;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS gps text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS usb_type text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS radio boolean DEFAULT false;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS infrared boolean DEFAULT false;

  -- Network
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS network_technology text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_2g text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_3g text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_4g text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_5g text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS network_speed text;

  -- Sound
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS loudspeaker_type text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS audio_jack boolean DEFAULT false;

  -- Features
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS sensors text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS available_colors text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS model_variants text[];

  -- First ensure all existing prices are valid
  UPDATE mobile_products SET price = 0 WHERE price < 0;

  -- Add check constraints safely
  ALTER TABLE mobile_products DROP CONSTRAINT IF EXISTS valid_weight;
  ALTER TABLE mobile_products DROP CONSTRAINT IF EXISTS valid_dimensions;
  
  -- Add constraints only if they don't exist
  DO $CONSTRAINTS$ 
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.constraint_column_usage 
      WHERE table_name = 'mobile_products' AND constraint_name = 'valid_weight'
    ) THEN
      ALTER TABLE mobile_products 
        ADD CONSTRAINT valid_weight 
        CHECK (weight IS NULL OR weight ~ '^[0-9.]+ g$');
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.constraint_column_usage 
      WHERE table_name = 'mobile_products' AND constraint_name = 'valid_dimensions'
    ) THEN
      ALTER TABLE mobile_products 
        ADD CONSTRAINT valid_dimensions 
        CHECK (dimensions IS NULL OR dimensions ~ '^[0-9.]+ x [0-9.]+ x [0-9.]+ mm$');
    END IF;
  END $CONSTRAINTS$;

  -- Create indexes for common queries
  CREATE INDEX IF NOT EXISTS idx_mobile_products_price_range ON mobile_products (price);
  CREATE INDEX IF NOT EXISTS idx_mobile_products_brand_model ON mobile_products (brand, name);
  CREATE INDEX IF NOT EXISTS idx_mobile_products_announced ON mobile_products (announced);

  -- Add comments for documentation
  COMMENT ON TABLE mobile_products IS 'Detailed specifications for mobile phones';
  COMMENT ON COLUMN mobile_products.display_features IS 'JSON array of display features like HDR10, refresh rate, etc.';
  COMMENT ON COLUMN mobile_products.main_camera_specs IS 'Detailed camera specifications including sensors, aperture, etc.';
  COMMENT ON COLUMN mobile_products.network_technology IS 'Supported network technologies (GSM/CDMA/HSPA/LTE/5G)';

EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Error adding columns: %', SQLERRM;
END $$;