-- Update iPhone 15 Pro Max data
UPDATE mobile_products
SET
  announced = 'September 2023',
  status = 'Available',
  chipset = 'Apple A17 Pro',
  cpu_details = 'Hexa-core (2x3.78 GHz + 4x2.11 GHz)',
  gpu_details = 'Apple GPU (6-core graphics)',
  memory_type = 'LPDDR5',
  display_type = 'LTPO Super Retina XDR OLED',
  display_protection = 'Ceramic Shield glass',
  display_features = jsonb_build_object(
    'refresh_rate', '120Hz',
    'brightness', '2000 nits (peak)',
    'hdr', ARRAY['HDR10', 'Dolby Vision']
  ),
  main_camera_specs = jsonb_build_object(
    'main', '48 MP, f/1.8, 24mm (wide)',
    'ultrawide', '12 MP, f/2.2, 13mm, 120˚',
    'telephoto', '12 MP, f/2.8, 120mm (periscope telephoto)'
  ),
  main_camera_features = jsonb_build_object(
    'features', ARRAY[
      'Dual-LED dual-tone flash',
      'HDR (photo/panorama)',
      'Photonic Engine',
      'ProRAW'
    ]
  ),
  main_camera_video = jsonb_build_object(
    'resolution', ARRAY[
      '4K@24/25/30/60fps',
      '1080p@25/30/60/120/240fps',
      '10-bit HDR',
      'Dolby Vision HDR'
    ]
  ),
  selfie_camera_specs = jsonb_build_object(
    'main', '12 MP, f/1.9, 23mm (wide)',
    'features', ARRAY['HDR', 'Cinematic mode']
  ),
  selfie_camera_video = jsonb_build_object(
    'resolution', ARRAY[
      '4K@24/25/30/60fps',
      '1080p@25/30/60/120fps',
      'HDR',
      'Dolby Vision HDR'
    ]
  ),
  dimensions = '159.9 x 76.7 x 8.3 mm',
  weight = '221 g',
  build_material = 'Glass front (Gorilla Glass), titanium frame, glass back',
  sim_type = 'Nano-SIM and eSIM',
  protection_rating = 'IP68 dust/water resistant (up to 6m for 30 mins)',
  battery_type = 'Li-Ion',
  battery_charging = jsonb_build_object(
    'wired', '20W',
    'wireless', '15W MagSafe',
    'features', ARRAY['Fast charging', 'MagSafe wireless charging', 'Qi2 wireless charging']
  ),
  wlan = 'Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, hotspot',
  bluetooth = '5.3, A2DP, LE',
  nfc = true,
  gps = 'GPS, GLONASS, GALILEO, BDS, QZSS',
  usb_type = 'USB Type-C 3.2, DisplayPort',
  radio = false,
  infrared = false,
  network_technology = 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
  bands_2g = ARRAY['GSM 850', 'GSM 900', 'GSM 1800', 'GSM 1900'],
  bands_3g = ARRAY['HSDPA 850', 'HSDPA 900', 'HSDPA 1700', 'HSDPA 1900', 'HSDPA 2100'],
  bands_4g = ARRAY['LTE 1', 'LTE 2', 'LTE 3', 'LTE 4', 'LTE 5', 'LTE 7', 'LTE 8', 'LTE 12', 'LTE 13', 'LTE 17', 'LTE 18', 'LTE 19', 'LTE 20', 'LTE 25', 'LTE 26', 'LTE 28', 'LTE 30', 'LTE 32', 'LTE 34', 'LTE 38', 'LTE 39', 'LTE 40', 'LTE 41', 'LTE 42', 'LTE 46', 'LTE 48', 'LTE 66'],
  bands_5g = ARRAY['5G NR 1', '5G NR 2', '5G NR 3', '5G NR 5', '5G NR 7', '5G NR 8', '5G NR 12', '5G NR 20', '5G NR 25', '5G NR 28', '5G NR 38', '5G NR 40', '5G NR 41', '5G NR 48', '5G NR 66', '5G NR 77', '5G NR 78', '5G NR 79'],
  network_speed = 'HSPA 42.2/5.76 Mbps, LTE-A, 5G',
  loudspeaker_type = 'Stereo speakers',
  audio_jack = false,
  sensors = ARRAY['Face ID', 'accelerometer', 'gyro', 'proximity', 'compass', 'barometer'],
  available_colors = ARRAY['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
  model_variants = ARRAY['A2849', 'A2850', 'A2851', 'A2852']
WHERE name = 'iPhone 15 Pro Max';

-- Update Samsung Galaxy S24 Ultra data
UPDATE mobile_products
SET
  announced = 'January 2024',
  status = 'Available',
  chipset = 'Snapdragon 8 Gen 3',
  cpu_details = 'Octa-core (1x3.39 GHz Cortex-X4 & 3x3.1 GHz Cortex-A720 & 2x2.9 GHz Cortex-A720 & 2x2.2 GHz Cortex-A520)',
  gpu_details = 'Adreno 750',
  memory_type = 'LPDDR5X',
  display_type = 'Dynamic AMOLED 2X',
  display_protection = 'Corning Gorilla Glass Armor',
  display_features = jsonb_build_object(
    'refresh_rate', '120Hz',
    'brightness', '2600 nits (peak)',
    'hdr', ARRAY['HDR10+']
  ),
  main_camera_specs = jsonb_build_object(
    'main', '200 MP, f/1.7, 24mm (wide)',
    'periscope', '50 MP, f/3.4, 111mm (5x telephoto)',
    'telephoto', '10 MP, f/2.4, 67mm (3x)',
    'ultrawide', '12 MP, f/2.2, 13mm, 120˚'
  ),
  main_camera_features = jsonb_build_object(
    'features', ARRAY[
      'LED flash',
      'auto-HDR',
      'panorama',
      'AI photo assist',
      'ProRAW/ProRes'
    ]
  ),
  main_camera_video = jsonb_build_object(
    'resolution', ARRAY[
      '8K@24/30fps',
      '4K@30/60/120fps',
      '1080p@30/60/240fps',
      'HDR10+'
    ]
  ),
  selfie_camera_specs = jsonb_build_object(
    'main', '12 MP, f/2.2, 26mm (wide)',
    'features', ARRAY['Dual Pixel PDAF', 'HDR']
  ),
  selfie_camera_video = jsonb_build_object(
    'resolution', ARRAY[
      '4K@30/60fps',
      '1080p@30/60fps'
    ]
  ),
  dimensions = '162.3 x 79 x 8.6 mm',
  weight = '233 g',
  build_material = 'Glass front (Gorilla Glass Armor), titanium frame, glass back',
  sim_type = 'Nano-SIM and eSIM',
  protection_rating = 'IP68 dust/water resistant (up to 1.5m for 30 mins)',
  battery_type = 'Li-Ion',
  battery_charging = jsonb_build_object(
    'wired', '45W',
    'wireless', '15W',
    'reverse', '4.5W',
    'features', ARRAY['Fast charging', 'Fast wireless charging', 'Reverse wireless charging']
  ),
  wlan = 'Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct',
  bluetooth = '5.3, A2DP, LE',
  nfc = true,
  gps = 'GPS, GLONASS, BDS, GALILEO',
  usb_type = 'USB Type-C 3.2',
  radio = false,
  infrared = false,
  network_technology = 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
  bands_2g = ARRAY['GSM 850', 'GSM 900', 'GSM 1800', 'GSM 1900'],
  bands_3g = ARRAY['HSDPA 850', 'HSDPA 900', 'HSDPA 1900', 'HSDPA 2100'],
  bands_4g = ARRAY['LTE 1', 'LTE 2', 'LTE 3', 'LTE 4', 'LTE 5', 'LTE 7', 'LTE 8', 'LTE 12', 'LTE 13', 'LTE 17', 'LTE 18', 'LTE 19', 'LTE 20', 'LTE 25', 'LTE 26', 'LTE 28', 'LTE 66'],
  bands_5g = ARRAY['5G NR 1', '5G NR 2', '5G NR 3', '5G NR 5', '5G NR 7', '5G NR 8', '5G NR 12', '5G NR 20', '5G NR 25', '5G NR 28', '5G NR 38', '5G NR 40', '5G NR 41', '5G NR 66', '5G NR 77', '5G NR 78'],
  network_speed = 'HSPA, LTE-A (up to 7CA), 5G',
  loudspeaker_type = 'Stereo speakers, tuned by AKG',
  audio_jack = false,
  sensors = ARRAY['Fingerprint (under display, ultrasonic)', 'accelerometer', 'gyro', 'proximity', 'compass', 'barometer'],
  available_colors = ARRAY['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
  model_variants = ARRAY['SM-S928B', 'SM-S928B/DS', 'SM-S928U', 'SM-S928U1']
WHERE name = 'Samsung Galaxy S24 Ultra';