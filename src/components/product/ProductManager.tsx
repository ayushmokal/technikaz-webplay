import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductTable } from "./ProductTable";
import { ProductDetailsDialog } from "./ProductDetailsDialog";
import { ProductEditDialog } from "../admin/ProductEditDialog";
import { ProductImageDialog } from "../admin/ProductImageDialog";
import { ExpertReviewForm } from "../admin/ExpertReviewForm";
import type { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export function ProductManager() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState<Product | null>(null);
  const [selectedProductForImages, setSelectedProductForImages] = useState<Product | null>(null);
  const { toast } = useToast();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const [{ data: mobiles }, { data: laptops }] = await Promise.all([
        supabase.from("mobile_products").select("*"),
        supabase.from("laptops").select("*")
      ]);

      return [...(mobiles || []), ...(laptops || [])] as Product[];
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await Promise.all([
        supabase.from("mobile_products").delete().eq("id", id),
        supabase.from("laptops").delete().eq("id", id)
      ]);
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-4">
      <ProductTable
        products={products}
        onView={(product) => setSelectedProduct(product)}
        onEdit={(product) => setSelectedProductForEdit(product)}
        onAddReview={(product) => {
          setSelectedProductForReview(product);
          setIsReviewOpen(true);
        }}
        onDelete={handleDelete}
        onUpdateImages={(product) => setSelectedProductForImages(product)}
      />

      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {selectedProductForEdit && (
        <ProductEditDialog
          product={selectedProductForEdit}
          onClose={() => setSelectedProductForEdit(null)}
          onSuccess={() => {
            setSelectedProductForEdit(null);
            refetch();
          }}
        />
      )}

      {selectedProductForImages && (
        <ProductImageDialog
          productId={selectedProductForImages.id}
          currentImage={selectedProductForImages.image_url}
          currentGalleryImages={selectedProductForImages.gallery_images}
          onClose={() => setSelectedProductForImages(null)}
          onSuccess={() => {
            setSelectedProductForImages(null);
            refetch();
          }}
          type={selectedProductForImages.graphics ? 'laptop' : 'mobile'}
        />
      )}

      {selectedProductForReview && (
        <ExpertReviewForm
          productId={selectedProductForReview.id}
          onSuccess={() => {
            setSelectedProductForReview(null);
            setIsReviewOpen(false);
          }}
        />
      )}
    </div>
  );
}