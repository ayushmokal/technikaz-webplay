import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SpecificationItemProps {
  label: string;
  value: string | number | boolean | string[] | null | undefined;
}

function SpecificationItem({ label, value }: SpecificationItemProps) {
  if (value === null || value === undefined) return null;
  
  // Handle boolean values
  if (typeof value === 'boolean') {
    value = value ? 'Yes' : 'No';
  }

  // Handle array values
  if (Array.isArray(value)) {
    value = value.join(', ');
  }

  return (
    <div className="flex justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

interface SpecificationSectionProps {
  title: string;
  specs: { label: string; value: string | number | boolean | null | undefined }[];
}

function SpecificationSection({ title, specs }: SpecificationSectionProps) {
  const validSpecs = specs.filter(spec => spec.value !== null && spec.value !== undefined);
  if (validSpecs.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {validSpecs.map((spec, index) => (
        <SpecificationItem key={index} {...spec} />
      ))}
      <Separator className="my-4" />
    </div>
  );
}

interface ProductSpecificationsProps {
  product: {
    name: string;
    brand: string;
    price: number;
    model_name?: string;
    announced?: string;
    status?: string;
    display_specs: string;
    display_type?: string;
    display_size?: string;
    display_resolution?: string;
    display_protection?: string;
    processor: string;
    cpu_details?: string;
    gpu_details?: string;
    ram: string;
    memory_type?: string;
    card_slot?: boolean;
    storage: string;
    camera?: string;
    battery: string;
    battery_type?: string;
    charging_specs?: string;
    os?: string;
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
    audio_jack?: boolean;
    sensors?: string[];
    available_colors?: string[];
    [key: string]: any;
  };
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SpecificationSection
          title="Basic Information"
          specs={[
            { label: "Brand", value: product.brand },
            { label: "Model", value: product.name },
            { label: "Price", value: `₹${product.price.toLocaleString()}` },
            { label: "Announced", value: product.announced },
            { label: "Status", value: product.status },
          ]}
        />
        
        <SpecificationSection
          title="Display"
          specs={[
            { label: "Type", value: product.display_type },
            { label: "Size", value: product.display_size },
            { label: "Resolution", value: product.display_resolution },
            { label: "Protection", value: product.display_protection },
            { label: "Specifications", value: product.display_specs },
          ]}
        />

        <SpecificationSection
          title="Platform"
          specs={[
            { label: "Processor", value: product.processor },
            { label: "CPU Details", value: product.cpu_details },
            { label: "GPU Details", value: product.gpu_details },
            { label: "Operating System", value: product.os },
          ]}
        />

        <SpecificationSection
          title="Memory"
          specs={[
            { label: "RAM", value: product.ram },
            { label: "Storage", value: product.storage },
            { label: "Memory Type", value: product.memory_type },
            { label: "Card Slot", value: product.card_slot },
          ]}
        />

        {product.camera && (
          <SpecificationSection
            title="Camera"
            specs={[
              { label: "Main Camera", value: product.camera },
              { label: "Main Camera Features", value: product.main_camera_features ? JSON.stringify(product.main_camera_features, null, 2) : undefined },
              { label: "Video Recording", value: product.main_camera_video ? JSON.stringify(product.main_camera_video, null, 2) : undefined },
              { label: "Selfie Camera", value: product.selfie_camera_specs ? JSON.stringify(product.selfie_camera_specs, null, 2) : undefined },
            ]}
          />
        )}

        <SpecificationSection
          title="Body"
          specs={[
            { label: "Dimensions", value: product.dimensions },
            { label: "Weight", value: product.weight },
            { label: "Build", value: product.build_material },
            { label: "SIM", value: product.sim_type },
            { label: "Protection", value: product.protection_rating },
          ]}
        />

        <SpecificationSection
          title="Battery & Charging"
          specs={[
            { label: "Capacity", value: product.battery },
            { label: "Type", value: product.battery_type },
            { label: "Charging", value: product.charging_specs },
          ]}
        />

        <SpecificationSection
          title="Communications"
          specs={[
            { label: "WLAN", value: product.wlan },
            { label: "Bluetooth", value: product.bluetooth },
            { label: "NFC", value: product.nfc },
            { label: "GPS", value: product.gps },
            { label: "USB Type", value: product.usb_type },
            { label: "Radio", value: product.radio },
            { label: "Infrared", value: product.infrared },
          ]}
        />

        <SpecificationSection
          title="Network"
          specs={[
            { label: "Technology", value: product.network_technology },
            { label: "2G Bands", value: product.bands_2g },
            { label: "3G Bands", value: product.bands_3g },
            { label: "4G Bands", value: product.bands_4g },
            { label: "5G Bands", value: product.bands_5g },
            { label: "Speed", value: product.network_speed },
          ]}
        />

        <SpecificationSection
          title="Sound"
          specs={[
            { label: "Loudspeaker", value: product.loudspeaker_type },
            { label: "3.5mm Jack", value: product.audio_jack },
          ]}
        />

        <SpecificationSection
          title="Features"
          specs={[
            { label: "Sensors", value: product.sensors },
            { label: "Available Colors", value: product.available_colors },
          ]}
        />
      </CardContent>
    </Card>
  );
}