import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductTable } from "./ProductTable";
import { ProductDetailsDialog } from "./ProductDetailsDialog";
import { ProductEditDialog } from "./ProductEditDialog";
import { ProductImageDialog } from "./ProductImageDialog";
import { ExpertReviewForm } from "@/components/admin/ExpertReviewForm";
import type { Product } from "@/types/product";

export function ProductManager() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [selectedProductForImages, setSelectedProductForImages] = useState<Product | null>(null);
  const [selectedProductForReview, setSelectedProductForReview] = useState<Product | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const { data: products = [], refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const [mobileRes, laptopRes] = await Promise.all([
        supabase.from("mobile_products").select("*"),
        supabase.from("laptops").select("*")
      ]);

      if (mobileRes.error) throw mobileRes.error;
      if (laptopRes.error) throw laptopRes.error;

      return [...mobileRes.data, ...laptopRes.data] as Product[];
    }
  });

  const handleDelete = async (id: string) => {
    try {
      await Promise.all([
        supabase.from("mobile_products").delete().eq("id", id),
        supabase.from("laptops").delete().eq("id", id)
      ]);
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProductForEdit(product);
  };

  const handleViewImages = (product: Product) => {
    setSelectedProductForImages(product);
  };

  const handleAddReview = (product: Product) => {
    setSelectedProductForReview(product);
    setIsReviewOpen(true);
  };

  return (
    <div>
      <ProductTable
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onViewImages={handleViewImages}
        onAddReview={handleAddReview}
        onView={setSelectedProduct}
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
          productType={selectedProductForEdit.graphics ? 'laptop' : 'mobile'}
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
          isOpen={true}
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
            refetch();
          }}
        />
      )}
    </div>
  );
}