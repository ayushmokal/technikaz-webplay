import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface SpecificationsSectionProps {
  form: UseFormReturn<ProductFormData>;
  productType: 'mobile' | 'laptop';
}

export function SpecificationsSection({ form, productType }: SpecificationsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Key Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="display_specs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Specifications</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    productType === 'mobile' 
                      ? "e.g., 6.7-inch Super Retina XDR OLED" 
                      : "e.g., 15.6-inch 4K OLED"
                  } 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Include size, technology, and key features
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="processor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Processor</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    productType === 'mobile'
                      ? "e.g., Apple A17 Pro, Snapdragon 8 Gen 3"
                      : "e.g., Intel Core i9-13900H"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specify the processor model and generation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RAM</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    productType === 'mobile'
                      ? "e.g., 8GB LPDDR5"
                      : "e.g., 32GB DDR5"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include capacity and type if known
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    productType === 'mobile'
                      ? "e.g., 256GB NVMe"
                      : "e.g., 1TB PCIe 4.0 SSD"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specify capacity and type
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="battery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    productType === 'mobile'
                      ? "e.g., 5000 mAh"
                      : "e.g., 99.9Wh"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {productType === 'mobile' 
                  ? "Enter capacity in mAh"
                  : "Enter capacity in Wh"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {productType === 'mobile' ? (
          <FormField
            control={form.control}
            name="camera"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camera</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., 48MP Main + 12MP Ultra Wide + 12MP Telephoto" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  List all camera specifications with MP values
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="graphics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Graphics</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., NVIDIA RTX 4070 8GB GDDR6" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specify GPU model and VRAM details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}