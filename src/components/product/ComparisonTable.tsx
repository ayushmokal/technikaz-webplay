import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ComparisonTableProps {
  selectedProducts: (MobileProduct | LaptopProduct)[];
  currentProduct: MobileProduct | LaptopProduct;
  type: 'mobile' | 'laptop';
  onRemove: (productId: string) => void;
}

export function ComparisonTable({ selectedProducts, currentProduct, type, onRemove }: ComparisonTableProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const specCategories = {
    basic: {
      title: "Basic Information",
      specs: [
        { title: "Price", key: "price", format: (value: number) => `₹${value.toLocaleString()}` },
        { title: "Brand", key: "brand" },
        { title: "Model", key: "model_name" },
      ]
    },
    display: {
      title: "Display",
      specs: [
        { title: "Display", key: "display_specs" },
        { title: "Type", key: "display_type" },
        { title: "Size", key: "display_size" },
        { title: "Resolution", key: "display_resolution" },
        { title: "Protection", key: "display_protection" },
      ]
    },
    performance: {
      title: "Performance",
      specs: [
        { title: "Processor", key: "processor" },
        { title: "CPU Details", key: "cpu_details" },
        { title: "GPU Details", key: "gpu_details" },
        { title: "RAM", key: "ram" },
        { title: "Storage", key: "storage" },
        { title: "Memory Type", key: "memory_type" },
        { title: "Card Slot", key: "card_slot", format: (value: boolean) => value ? "Yes" : "No" },
      ]
    },
    battery: {
      title: "Battery & Charging",
      specs: [
        { title: "Battery", key: "battery" },
        { title: "Battery Type", key: "battery_type" },
        { title: "Charging", key: "charging_specs" },
      ]
    },
    camera: type === 'mobile' ? {
      title: "Camera",
      specs: [
        { title: "Camera", key: "camera" },
        { title: "Chipset", key: "chipset" },
      ]
    } : null,
    design: {
      title: "Design & Build",
      specs: [
        { title: "Dimensions", key: "dimensions" },
        { title: "Weight", key: "weight" },
        { title: "Build", key: "build_material" },
        { title: "Color", key: "color" },
        ...(type === 'mobile' ? [
          { title: "SIM", key: "sim_type" },
          { title: "Protection", key: "protection_rating" },
        ] : [])
      ]
    },
    connectivity: type === 'mobile' ? {
      title: "Connectivity",
      specs: [
        { title: "WLAN", key: "wlan" },
        { title: "Bluetooth", key: "bluetooth" },
        { title: "NFC", key: "nfc", format: (value: boolean) => value ? "Yes" : "No" },
        { title: "GPS", key: "gps" },
        { title: "USB Type", key: "usb_type" },
        { title: "Radio", key: "radio", format: (value: boolean) => value ? "Yes" : "No" },
        { title: "Infrared", key: "infrared", format: (value: boolean) => value ? "Yes" : "No" },
      ]
    } : null,
    network: type === 'mobile' ? {
      title: "Network",
      specs: [
        { title: "Technology", key: "network_technology" },
        { title: "Speed", key: "network_speed" },
      ]
    } : null,
    sound: type === 'mobile' ? {
      title: "Sound",
      specs: [
        { title: "Loudspeaker", key: "loudspeaker_type" },
        { title: "3.5mm Jack", key: "audio_jack", format: (value: boolean) => value ? "Yes" : "No" },
      ]
    } : null,
    ...(type === 'laptop' ? {
      extras: {
        title: "Additional Features",
        specs: [
          { title: "Graphics", key: "graphics" },
          { title: "Ports", key: "ports" },
        ]
      }
    } : {})
  };

  const displayProducts = selectedProducts.slice(1, 3);

  const formatValue = (spec: any, value: any) => {
    if (value === null || value === undefined) return 'N/A';
    if (spec.format) return spec.format(value);
    if (Array.isArray(value)) return value.join(', ');
    return value.toString();
  };

  return (
    <div className="mt-6">
      {/* Desktop View - Hidden on Mobile */}
      <div className="hidden md:block">
        <ScrollArea className="w-full">
          <div className="grid grid-cols-4 gap-4 mb-4 min-w-[640px]">
            <div className="font-semibold sticky left-0 bg-background">Specifications</div>
            {[currentProduct, ...displayProducts].map((product, index) => (
              <div key={product.id} className="relative">
                <div className="flex items-center gap-2">
                  <img 
                    src={product.image_url || "/placeholder.svg"} 
                    alt={product.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="line-clamp-2">{product.name}</span>
                </div>
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2"
                    onClick={() => onRemove(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 min-w-[640px]">
            {Object.entries(specCategories).map(([key, category]) => {
              if (!category) return null;
              return category.specs.map((spec) => (
                <div key={spec.key}>
                  <div className="grid grid-cols-4 gap-4 py-3">
                    <div className="font-medium text-gray-700 sticky left-0 bg-background">
                      {spec.title}
                    </div>
                    <div className="text-gray-600 break-words">
                      {formatValue(spec, currentProduct[spec.key as keyof typeof currentProduct])}
                    </div>
                    {displayProducts.map((product) => (
                      <div key={`${product.id}-${spec.key}`} className="text-gray-600 break-words">
                        {formatValue(spec, product[spec.key as keyof typeof product])}
                      </div>
                    ))}
                  </div>
                  <Separator />
                </div>
              ));
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile View - Hidden on Desktop */}
      <div className="md:hidden">
        <Accordion type="single" collapsible>
          {Object.entries(specCategories).map(([key, category]) => {
            if (!category) return null;
            return (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="text-lg font-semibold">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {category.specs.map((spec) => (
                      <div key={spec.key} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{spec.title}</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {[currentProduct, ...displayProducts].map((product, index) => (
                            <div key={`${product.id}-${spec.key}`} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={product.image_url || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-8 h-8 object-contain"
                                />
                                <span className="text-sm font-medium">{product.name}</span>
                              </div>
                              <span className="text-sm">
                                {formatValue(spec, product[spec.key as keyof typeof product])}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}