import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";

interface BasicInfoSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., iPhone 15 Pro Max" {...field} />
              </FormControl>
              <FormDescription>
                Enter the full product name including variant details
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Apple, Samsung" {...field} />
              </FormControl>
              <FormDescription>
                Enter the manufacturer's brand name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name/Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., A2849, SM-S918B" {...field} />
              </FormControl>
              <FormDescription>
                Enter the specific model identifier (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter price in INR" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  min="0"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>
                Enter the price in Indian Rupees without commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Natural Titanium, Phantom Black" {...field} />
              </FormControl>
              <FormDescription>
                Enter the specific color variant
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="os"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operating System</FormLabel>
              <FormControl>
                <Input placeholder="e.g., iOS 17, Android 14" {...field} />
              </FormControl>
              <FormDescription>
                Include OS version if applicable
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}