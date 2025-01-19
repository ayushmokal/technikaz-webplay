import type { Json } from "@/integrations/supabase/types";

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
  design_specs?: Json;
  display_details?: Json;
  performance_specs?: Json;
  multimedia_specs?: Json;
}

export interface LaptopProduct extends BaseProduct {
  graphics: string | null;
  ports: string | null;
  connectivity_specs?: Json;
}

export interface MobileProduct extends BaseProduct {
  camera: string;
  chipset?: string | null;
  charging_specs?: string | null;
  resolution?: string | null;
  screen_size?: string | null;
  announced?: string | null;
  status?: string | null;
  display_type?: string | null;
  display_protection?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  build_material?: string | null;
  sim_type?: string | null;
  wlan?: string | null;
  bluetooth?: string | null;
  nfc?: boolean;
  gps?: string | null;
  usb_type?: string | null;
  network_technology?: string | null;
  network_speed?: string | null;
  sensors?: string[];
  available_colors?: string[];
  bands_2g?: string[];
  bands_3g?: string[];
  bands_4g?: string[];
  bands_5g?: string[];
  display_features?: Record<string, any>;
  main_camera_specs?: Record<string, any>;
  main_camera_features?: Record<string, any>;
  main_camera_video?: Record<string, any>;
  selfie_camera_specs?: Record<string, any>;
  selfie_camera_features?: Record<string, any>;
  selfie_camera_video?: Record<string, any>;
  battery_charging?: Record<string, any>;
  loudspeaker_type?: string | null;
  audio_jack?: boolean;
  radio?: boolean;
  infrared?: boolean;
  card_slot?: boolean;
}

export type Product = MobileProduct | LaptopProduct;