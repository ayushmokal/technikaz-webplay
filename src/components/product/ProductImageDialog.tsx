import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageSection } from "@/components/admin/form-sections/ImageSection";

export interface ProductImageDialogProps {
  productId: string;
  currentImage?: string;
  currentGalleryImages?: string[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  type: 'mobile' | 'laptop';
}

export function ProductImageDialog({
  productId,
  currentImage,
  currentGalleryImages,
  isOpen,
  onClose,
  onSuccess,
  type
}: ProductImageDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Product Images</DialogTitle>
        </DialogHeader>
        <ImageSection
          currentImageUrl={currentImage}
          currentGalleryImages={currentGalleryImages}
          onMainImageChange={() => {}}
          onGalleryImagesChange={() => {}}
          onRemoveGalleryImage={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
}