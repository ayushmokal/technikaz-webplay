-- Add missing fields to mobile_products table
DO $$ 
BEGIN
  -- Camera Details
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS main_camera_specs jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS main_camera_features jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS main_camera_video jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_specs jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_features jsonb;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_video jsonb;

  -- Battery Details
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS battery_type text;
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS battery_charging jsonb;

  -- Display Features
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_features jsonb;

  -- Protection
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS protection_rating text;

  -- Network Bands (if not already added)
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_2g text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_3g text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_4g text[];
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_5g text[];

  -- Sound
  ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS loudspeaker_type text;

  -- Add comments for documentation
  COMMENT ON COLUMN mobile_products.main_camera_specs IS 'Main camera specifications in detail';
  COMMENT ON COLUMN mobile_products.main_camera_features IS 'Features of the main camera';
  COMMENT ON COLUMN mobile_products.main_camera_video IS 'Video recording capabilities of main camera';
  COMMENT ON COLUMN mobile_products.selfie_camera_specs IS 'Front camera specifications';
  COMMENT ON COLUMN mobile_products.selfie_camera_features IS 'Features of the front camera';
  COMMENT ON COLUMN mobile_products.selfie_camera_video IS 'Video recording capabilities of front camera';
  COMMENT ON COLUMN mobile_products.battery_type IS 'Type of battery (Li-Po, Li-Ion, etc.)';
  COMMENT ON COLUMN mobile_products.battery_charging IS 'Charging capabilities and features';
  COMMENT ON COLUMN mobile_products.display_features IS 'Additional display features like HDR, refresh rate';
  COMMENT ON COLUMN mobile_products.protection_rating IS 'IP rating or other protection certifications';
  COMMENT ON COLUMN mobile_products.bands_2g IS 'Supported 2G network bands';
  COMMENT ON COLUMN mobile_products.bands_3g IS 'Supported 3G network bands';
  COMMENT ON COLUMN mobile_products.bands_4g IS 'Supported 4G network bands';
  COMMENT ON COLUMN mobile_products.bands_5g IS 'Supported 5G network bands';
  COMMENT ON COLUMN mobile_products.loudspeaker_type IS 'Type and features of loudspeaker';

EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Error adding columns: %', SQLERRM;
END $$;