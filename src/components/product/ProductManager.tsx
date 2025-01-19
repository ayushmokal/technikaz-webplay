const [products, setProducts] = useState<Product[]>([]);
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [showExpertReview, setShowExpertReview] = useState(false);
const [selectedProductForReview, setSelectedProductForReview] = useState<Product | null>(null);

const handleView = (product: Product) => {
  setSelectedProduct(product);
};

const handleAddReview = (product: Product) => {
  setSelectedProductForReview(product);
  setShowExpertReview(true);
};

const handleDelete = async (product: Product) => {
  try {
    await deleteProduct(product.id);
    fetchProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const handleUpdateImages = (product: Product) => {
  setSelectedProductForImages(product);
};

return (
  <div>
    <ProductTable
      products={products}
      onView={handleView}
      onAddReview={handleAddReview}
      onDelete={handleDelete}
      onUpdateImages={handleUpdateImages}
    />

    {selectedProduct && (
      <ProductDetailsDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)} 
      />
    )}

    {selectedProductForReview && showExpertReview && (
      <ExpertReviewDialog
        product={selectedProductForReview}
        onClose={() => {
          setShowExpertReview(false);
          setSelectedProductForReview(null);
        }}
      />
    )}

    {selectedProductForImages && (
      <ProductImageDialog
        product={selectedProductForImages}
        onClose={() => setSelectedProductForImages(null)}
        onSuccess={() => {
          setSelectedProductForImages(null);
          fetchProducts();
        }}
        productType={productType}
      />
    )}
  </div>
);