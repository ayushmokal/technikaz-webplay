@@ .. @@
   onView: (product: Product) => void;
-  onEdit: (product: Product) => void;
   onAddReview: (product: Product) => void;
   onDelete: (id: string) => void;
   onUpdateImages: (product: Product) => void;
@@ .. @@
 export function ProductTable({
   products,
   onView,
-  onEdit,
   onAddReview,
   onDelete,
   onUpdateImages,
@@ .. @@
                     >
                       View Details
                     </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="opacity-50 cursor-not-allowed"
                    >
                      Edit
                    </Button>
-                    <Button
-                      variant="outline"
-                      size="sm"
-                      onClick={() => onEdit(product)}
-                    >
-                      Edit
-                    </Button>
                     <Button
                       variant="outline"
                       size="sm"