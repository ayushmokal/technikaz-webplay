import * as z from "zod";
import type { Json } from "@/integrations/supabase/types";

const baseProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model_name: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  display_specs: z.string().min(1, "Display specifications are required"),
  processor: z.string().min(1, "Processor is required"),
  ram: z.string().min(1, "RAM is required"),
  storage: z.string().min(1, "Storage is required"),
  battery: z.string().min(1, "Battery specifications are required"),
  os: z.string().optional(),
  color: z.string().optional(),
  image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
  multimedia_specs: z.custom<Json>().optional(),
  design_specs: z.custom<Json>().optional(),
  performance_specs: z.custom<Json>().optional(),
  display_details: z.custom<Json>().optional(),
});

// Create a base schema for updates where all fields are optional
const baseProductUpdateSchema = baseProductSchema.partial();

export const mobileProductSchema = baseProductSchema.extend({
  camera: z.string().min(1, "Camera specifications are required"),
  chipset: z.string().optional(),
  charging_specs: z.string().optional(),
  resolution: z.string().optional(),
  screen_size: z.string().optional(),
  announced: z.string().optional(),
  status: z.string().optional(),
  cpu_details: z.string().optional(),
  gpu_details: z.string().optional(),
  card_slot: z.boolean().optional(),
  memory_type: z.string().optional(),
  display_type: z.string().optional(),
  display_protection: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  build_material: z.string().optional(),
  sim_type: z.string().optional(),
  protection_rating: z.string().optional(),
  wlan: z.string().optional(),
  bluetooth: z.string().optional(),
  nfc: z.boolean().optional(),
  gps: z.string().optional(),
  usb_type: z.string().optional(),
  radio: z.boolean().optional(),
  infrared: z.boolean().optional(),
  network_technology: z.string().optional(),
  network_speed: z.string().optional(),
  loudspeaker_type: z.string().optional(),
  audio_jack: z.boolean().optional(),
  sensors: z.array(z.string()).optional(),
  available_colors: z.array(z.string()).optional(),
  model_variants: z.array(z.string()).optional(),
  bands_2g: z.array(z.string()).optional(),
  bands_3g: z.array(z.string()).optional(),
  bands_4g: z.array(z.string()).optional(),
  bands_5g: z.array(z.string()).optional(),
});

export const laptopProductSchema = baseProductSchema.extend({
  graphics: z.string().optional(),
  ports: z.string().optional(),
  connectivity_specs: z.custom<Json>().optional(),
});

// Create update schemas where all fields are optional
export const mobileProductUpdateSchema = mobileProductSchema.partial();
export const laptopProductUpdateSchema = laptopProductSchema.partial();

export type ProductFormData = z.infer<typeof mobileProductSchema> | z.infer<typeof laptopProductSchema>;
export type ProductUpdateData = z.infer<typeof mobileProductUpdateSchema> | z.infer<typeof laptopProductUpdateSchema>;

export const expertReviewSchema = z.object({
  rating: z.number().min(0).max(10),
  author: z.string().min(1, "Author is required"),
  summary: z.string().min(1, "Summary is required"),
  pros: z.array(z.string()).min(1, "At least one pro is required"),
  cons: z.array(z.string()).min(1, "At least one con is required"),
  verdict: z.string().min(1, "Verdict is required"),
});

export type ExpertReviewFormData = z.infer<typeof expertReviewSchema>;