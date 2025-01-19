export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  os: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  gallery_images: string[] | null;
  model_name: string | null;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
}

export interface MobileProduct extends BaseProduct {
  // Basic Camera
  camera: string;
  
  // Launch Details
  announced: string | null;
  status: string | null;

  // Platform
  cpu_details: string | null;
  gpu_details: string | null;
  chipset: string | null;

  // Memory
  card_slot: boolean | null;
  memory_type: string | null;

  // Display
  display_type: string | null;
  display_size: string | null;
  display_resolution: string | null;
  display_protection: string | null;
  display_features: Record<string, any> | null;

  // Camera Details
  main_camera_specs: Record<string, any> | null;
  main_camera_features: Record<string, any> | null;
  main_camera_video: Record<string, any> | null;
  selfie_camera_specs: Record<string, any> | null;
  selfie_camera_features: Record<string, any> | null;
  selfie_camera_video: Record<string, any> | null;

  // Body
  dimensions: string | null;
  weight: string | null;
  build_material: string | null;
  sim_type: string | null;
  protection_rating: string | null;

  // Battery & Charging
  battery_type: string | null;
  battery_charging: Record<string, any> | null;
  charging_specs: string | null;

  // Communications
  wlan: string | null;
  bluetooth: string | null;
  nfc: boolean | null;
  gps: string | null;
  usb_type: string | null;
  radio: boolean | null;
  infrared: boolean | null;

  // Network
  network_technology: string | null;
  bands_2g: string[] | null;
  bands_3g: string[] | null;
  bands_4g: string[] | null;
  bands_5g: string[] | null;
  network_speed: string | null;

  // Sound
  loudspeaker_type: string | null;
  audio_jack: boolean | null;

  // Features
  sensors: string[] | null;
  available_colors: string[] | null;
  model_variants: string[] | null;

  // Legacy fields
  resolution: string | null;
  screen_size: string | null;
}