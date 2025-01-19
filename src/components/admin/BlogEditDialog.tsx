import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogForm } from "./BlogForm";
import type { BlogFormData } from "@/types/blog";

interface BlogEditDialogProps {
  blog: BlogFormData;
  onClose: () => void;
  onSuccess: () => void;
}

export function BlogEditDialog({ blog, onClose, onSuccess }: BlogEditDialogProps) {
  return (
    <Dialog open={!!blog} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>
        <BlogForm 
          initialData={blog}
          onSuccess={onSuccess}
          mode="edit"
        />
      </DialogContent>
    </Dialog>
  );
}