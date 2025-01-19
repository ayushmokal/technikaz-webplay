-- Insert sample mobile phones
INSERT INTO mobile_products (
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
  camera_details,
  network_specs,
  general_specs
) VALUES
(
  'iPhone 15 Pro Max',
  'Apple',
  159900.00,
  'Super Retina XDR OLED, ProMotion',
  'A17 Pro',
  '8GB',
  '256GB',
  '4422 mAh',
  '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
  'A17 Pro Bionic',
  '20W Fast Charging',
  '2796 x 1290 pixels',
  '6.7 inches',
  'Natural Titanium',
  'iOS 17',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/iphone15promax.webp',
  jsonb_build_object(
    'main_features', '48 MP, f/1.8, 24mm (wide)',
    'main_video', '4K@60fps, HDR, Dolby Vision HDR',
    'selfie_features', '12 MP, f/1.9, 23mm (wide)',
    'selfie_video', '4K@60fps, HDR'
  ),
  jsonb_build_object(
    'technology', 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
    '5g_bands', '1, 2, 3, 5, 7, 8, 12, 20, 25, 28, 29, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6',
    'speed', 'HSPA, LTE-A, 5G'
  ),
  jsonb_build_object(
    'dimensions', '159.9 x 76.7 x 8.3 mm',
    'weight', '221 g',
    'build', 'Glass front (Gorilla Glass), titanium frame, glass back',
    'sim', 'Nano-SIM and eSIM'
  )
),
(
  'Samsung Galaxy S24 Ultra',
  'Samsung',
  134999.00,
  'Dynamic AMOLED 2X, 120Hz',
  'Snapdragon 8 Gen 3',
  '12GB',
  '256GB',
  '5000 mAh',
  '200MP + 12MP + 50MP + 10MP',
  'Snapdragon 8 Gen 3',
  '45W Fast Charging',
  '3088 x 1440 pixels',
  '6.8 inches',
  'Titanium Gray',
  'Android 14, One UI 6.1',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/s24ultra.webp',
  jsonb_build_object(
    'main_features', '200 MP, f/1.7, 24mm (wide)',
    'main_video', '8K@30fps, 4K@60fps, HDR10+',
    'selfie_features', '12 MP, f/2.2, 26mm (wide)',
    'selfie_video', '4K@60fps, HDR10+'
  ),
  jsonb_build_object(
    'technology', 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
    '5g_bands', 'SA/NSA/Sub6/mmWave',
    'speed', 'HSPA, LTE-A (up to 7CA), 5G'
  ),
  jsonb_build_object(
    'dimensions', '162.3 x 79 x 8.6 mm',
    'weight', '233 g',
    'build', 'Glass front (Gorilla Glass Armor), titanium frame, glass back',
    'sim', 'Nano-SIM and eSIM'
  )
);

-- Insert sample laptops
INSERT INTO laptops (
  name,
  brand,
  price,
  display_specs,
  processor,
  ram,
  storage,
  battery,
  graphics,
  ports,
  color,
  os,
  image_url,
  connectivity_specs,
  performance_specs
) VALUES
(
  'MacBook Pro 16 (2023)',
  'Apple',
  249900.00,
  'Liquid Retina XDR display',
  'Apple M3 Max',
  '32GB',
  '1TB SSD',
  '100Wh lithium-polymer',
  'Up to 40-core GPU',
  'Thunderbolt 4 (x3), HDMI, SDXC card slot',
  'Space Black',
  'macOS Sonoma',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/macbookpro16.webp',
  jsonb_build_object(
    'wifi', 'Wi-Fi 6E (802.11ax)',
    'bluetooth', '5.3',
    'webcam', '1080p FaceTime HD camera'
  ),
  jsonb_build_object(
    'cpu_cores', '16-core CPU',
    'gpu_cores', '40-core GPU',
    'neural_engine', '16-core Neural Engine'
  )
),
(
  'Dell XPS 15 (2024)',
  'Dell',
  179900.00,
  '15.6" OLED 3.5K (3456 x 2160)',
  'Intel Core i9-14900H',
  '32GB',
  '1TB SSD',
  '86Wh',
  'NVIDIA GeForce RTX 4070',
  'Thunderbolt 4, USB-C, SD card reader',
  'Platinum Silver',
  'Windows 11 Pro',
  'https://fkthvcaehstlbkgztspt.supabase.co/storage/v1/object/public/blog-images/xps15.webp',
  jsonb_build_object(
    'wifi', 'Killer Wi-Fi 6E AX1675',
    'bluetooth', '5.3',
    'webcam', '1080p with IR'
  ),
  jsonb_build_object(
    'cpu_cores', '14 cores (6P + 8E)',
    'gpu_memory', '8GB GDDR6',
    'memory_type', 'DDR5'
  )
);