import { supabase } from "@/integrations/supabase/client";
import type { MobileProduct, LaptopProduct } from "@/types/product";

export const useProductData = () => {
  const updateProduct = async (
    table: 'mobile_products' | 'laptops',
    id: string,
    data: Partial<MobileProduct | LaptopProduct>
  ) => {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  };

  const insertProduct = async (
    table: 'mobile_products' | 'laptops',
    data: Omit<MobileProduct | LaptopProduct, 'id' | 'created_at' | 'updated_at'>
  ) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  };

  return {
    updateProduct,
    insertProduct
  };
};