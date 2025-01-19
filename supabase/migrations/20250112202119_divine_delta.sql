/*
  # Create Initial Mobile Product Entry

  1. New Data
    - Creates initial mobile product entry
    - Sets up example data for Pixel 6a
    - Includes all required fields and specifications
*/

-- Insert initial mobile product
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