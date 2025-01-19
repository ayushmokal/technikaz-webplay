import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { SpecificationsSection } from "./form-sections/SpecificationsSection";
import { AdditionalSpecsSection } from "./form-sections/AdditionalSpecsSection";
import { ImageSection } from "./form-sections/ImageSection";
import { useProductForm } from "./hooks/useProductForm";
import type { MobileProductData, LaptopProductData } from "./types/productTypes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

// Sample data for mobile phones and laptops
const sampleData = {
  mobile: {
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 159900,
    display_specs: "6.7-inch Super Retina XDR OLED",
    processor: "A17 Pro",
    ram: "8GB",
    storage: "256GB",
    battery: "4422 mAh",
    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
    chipset: "A17 Pro Bionic",
    charging_specs: "20W Fast Charging",
    resolution: "2796 x 1290 pixels",
    screen_size: "6.7 inches",
    color: "Natural Titanium",
    os: "iOS 17",
    announced: "September 2023",
    status: "Available",
    display_type: "OLED",
    display_protection: "Ceramic Shield",
    dimensions: "159.9 x 76.7 x 8.3 mm",
    weight: "221 g",
    build_material: "Glass front, Titanium frame",
    sim_type: "Dual SIM (Nano-SIM and eSIM)",
    wlan: "Wi-Fi 6E",
    bluetooth: "5.3, A2DP, LE",
    nfc: true,
    gps: "GPS, GLONASS, GALILEO, BDS, QZSS",
    usb_type: "USB Type-C",
    network_technology: "GSM / CDMA / HSPA / EVDO / LTE / 5G",
    network_speed: "HSPA, LTE-A, 5G",
    sensors: ["Face ID", "accelerometer", "gyro", "proximity", "compass", "barometer"],
    available_colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
  },
  laptop: {
    name: "MacBook Pro 16 (2023)",
    brand: "Apple",
    price: 249900,
    display_specs: "16.2-inch Liquid Retina XDR display",
    processor: "Apple M3 Max",
    ram: "32GB Unified Memory",
    storage: "1TB SSD",
    battery: "100Wh",
    graphics: "Up to 40-core GPU",
    ports: "3x Thunderbolt 4, HDMI, SDXC card slot",
    color: "Space Black",
    os: "macOS Sonoma"
  }
};

interface ProductFormProps {
  initialData?: (MobileProductData | LaptopProductData) & { id?: string };
  onSuccess?: () => void;
  productType?: 'mobile' | 'laptop';
}

export function ProductForm({ initialData, onSuccess, productType: propProductType }: ProductFormProps) {
  const [selectedType, setSelectedType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();
  
  const {
    form,
    isLoading,
    productType,
    handleMainImageChange,
    handleGalleryImagesChange,
    handleRemoveGalleryImage,
    onSubmit,
  } = useProductForm({ 
    initialData, 
    onSuccess: () => {
      setShowSuccessDialog(true);
      toast({
        title: "Success",
        description: initialData ? "Product updated successfully" : "Product added successfully",
      });
      onSuccess?.();
    }, 
    productType: selectedType 
  });

  // Add error handling for table check
  const { data: tableExists } = useQuery({
    queryKey: ['check-table', selectedType],
    queryFn: async () => {
      const tableName = selectedType === 'laptop' ? 'laptops' : 'mobile_products';
      const { count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });
      
      return count !== null;
    },
    retry: false
  });

  const loadSampleData = () => {
    const sample = selectedType === 'mobile' ? sampleData.mobile : sampleData.laptop;
    Object.entries(sample).forEach(([key, value]) => {
      form.setValue(key as any, value);
    });
    toast({
      title: "Sample Data Loaded",
      description: "You can now edit the sample data before submitting.",
    });
  };

  const handleAddAnother = () => {
    setShowSuccessDialog(false);
    form.reset();
  };

  if (tableExists === false) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Database Setup Required</h3>
        <p className="text-yellow-700">
          The product tables have not been created yet. Please run the database migrations first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!initialData && (
        <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as 'mobile' | 'laptop')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mobile">Mobile Phone</TabsTrigger>
            <TabsTrigger value="laptop">Laptop</TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{initialData ? 'Edit' : 'Add'} {selectedType === 'mobile' ? 'Mobile Phone' : 'Laptop'}</CardTitle>
            {!initialData && (
              <Button 
                variant="outline" 
                onClick={loadSampleData}
                type="button"
              >
                Load Sample Data
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-8">
                <div className="space-y-6">
                  <BasicInfoSection form={form} />
                  <Separator />
                  <SpecificationsSection form={form} productType={selectedType} />
                  <Separator />
                  <AdditionalSpecsSection form={form} productType={selectedType} />
                  <Separator />
                  <ImageSection 
                    onMainImageChange={handleMainImageChange}
                    onGalleryImagesChange={handleGalleryImagesChange}
                    currentImageUrl={initialData?.image_url}
                    currentGalleryImages={initialData?.gallery_images}
                    onRemoveGalleryImage={handleRemoveGalleryImage}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                {initialData && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => form.reset(initialData)}
                  >
                    Reset Changes
                  </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : initialData ? "Update" : "Add"} {selectedType === 'mobile' ? 'Mobile Phone' : 'Laptop'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              {initialData ? "Product Updated Successfully" : "Product Added Successfully"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
            {!initialData && (
              <Button onClick={handleAddAnother}>
                Add Another Product
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}