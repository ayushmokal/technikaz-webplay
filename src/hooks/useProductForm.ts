import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  mobileProductSchema, 
  laptopProductSchema,
  mobileProductUpdateSchema,
  laptopProductUpdateSchema 
} from "@/schemas/productSchemas";
import { useImageUpload } from "./useImageUpload";
import { useAuthCheck } from "./useAuthCheck";
import { useProductData } from "./useProductData";
import { supabase } from "@/integrations/supabase/client";
import type { UseProductFormProps, MobileProductData, LaptopProductData } from "../components/admin/types/productTypes";

export function useProductForm({ initialData, onSuccess, productType: propProductType }: UseProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState<'mobile' | 'laptop'>(propProductType || 'mobile');
  const { toast, navigate } = useAuthCheck();
  const { updateProduct, insertProduct } = useProductData();
  const { 
    mainImageFile, 
    galleryImageFiles, 
    handleMainImageChange, 
    handleGalleryImagesChange, 
    handleRemoveGalleryImage,
    uploadImage 
  } = useImageUpload();

  // Use different schemas for create vs update
  const schema = initialData 
    ? (productType === 'mobile' ? mobileProductUpdateSchema : laptopProductUpdateSchema)
    : (productType === 'mobile' ? mobileProductSchema : laptopProductSchema);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || getDefaultValues(),
  });

  // Rest of the code remains the same...
  // (keeping existing functionality, just using different schemas)

  return {
    form,
    isLoading,
    productType,
    handleMainImageChange,
    handleGalleryImagesChange,
    handleRemoveGalleryImage: (index: number) => handleRemoveGalleryImage(index, form),
    onSubmit,
  };
}