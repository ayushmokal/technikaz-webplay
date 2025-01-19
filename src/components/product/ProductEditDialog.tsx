import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product } from "@/types/product";

export interface ProductEditDialogProps {
  product: Product;
  productType: 'mobile' | 'laptop';
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductEditDialog({ 
  product, 
  productType,
  onClose, 
  onSuccess 
}: ProductEditDialogProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {productType === 'mobile' ? 'Mobile Phone' : 'Laptop'}</DialogTitle>
        </DialogHeader>
        <ProductForm 
          initialData={product}
          productType={productType}
          onSuccess={onSuccess}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  );
}