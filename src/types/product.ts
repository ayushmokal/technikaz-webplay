export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  model_name?: string;
  price: number;
  display_specs: string;
  processor: string;
  ram: string;
  storage: string;
  battery: string;
  color?: string;
  os?: string;
  image_url?: string;
  gallery_images?: string[];
  created_at: string;
  updated_at: string;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  chipset?: string;
  charging_specs?: string;
  resolution?: string;
  screen_size?: string;
  announced?: string;
  status?: string;
  display_features?: Record<string, any>;
  camera_details?: Record<string, any>;
  sensor_specs?: Record<string, any>;
  network_specs?: Record<string, any>;
  general_specs?: Record<string, any>;
  design_specs?: Record<string, any>;
  display_details?: Record<string, any>;
  performance_specs?: Record<string, any>;
  multimedia_specs?: Record<string, any>;
  battery_charging?: Record<string, any>;
  main_camera_specs?: Record<string, any>;
  main_camera_features?: Record<string, any>;
  main_camera_video?: Record<string, any>;
  selfie_camera_specs?: Record<string, any>;
  selfie_camera_features?: Record<string, any>;
  selfie_camera_video?: Record<string, any>;
  audio_jack?: boolean;
  available_colors?: string[];
  bands_2g?: string[];
  bands_3g?: string[];
  bands_4g?: string[];
  bands_5g?: string[];
  battery_type?: string;
  dimensions?: string;
  weight?: string;
  build_material?: string;
  sim_type?: string;
  protection_rating?: string;
  wlan?: string;
  bluetooth?: string;
  nfc?: boolean;
  gps?: string;
  usb_type?: string;
  radio?: boolean;
  infrared?: boolean;
  network_technology?: string;
  network_speed?: string;
  loudspeaker_type?: string;
  sensors?: string[];
  model_variants?: string[];
}

export interface LaptopProduct extends BaseProduct {
  graphics?: string;
  ports?: string;
  connectivity_specs?: Record<string, any>;
  design_specs?: Record<string, any>;
  display_details?: Record<string, any>;
  performance_specs?: Record<string, any>;
  multimedia_specs?: Record<string, any>;
}

export type Product = MobileProduct | LaptopProduct;