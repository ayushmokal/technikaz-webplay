import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BlogFormData } from "@/types/blog";

interface BlogDetailsDialogProps {
  blog: BlogFormData;
  onClose: () => void;
}

export function BlogDetailsDialog({ blog, onClose }: BlogDetailsDialogProps) {
  return (
    <Dialog open={!!blog} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Category</h3>
            <p>{blog.category}</p>
          </div>
          <div>
            <h3 className="font-medium">Author</h3>
            <p>{blog.author}</p>
          </div>
          <div>
            <h3 className="font-medium">Content</h3>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}