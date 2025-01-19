import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CompareSearchBar } from "@/components/product/CompareSearchBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialProduct = location.state?.product as MobileProduct | LaptopProduct;
  const type = location.state?.type as 'mobile' | 'laptop';
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState<(MobileProduct | LaptopProduct)[]>(
    initialProduct ? [initialProduct] : []
  );

  if (!initialProduct || !type) {
    navigate('/gadgets');
    return null;
  }

  const handleAddProduct = (product: MobileProduct | LaptopProduct) => {
    if (products.length < 3) {
      setProducts([...products, product]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <Button
            variant="ghost"
            className="w-fit gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold">Compare Products</h1>
            <div className="w-full md:w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <CompareSearchBar
                  type={type}
                  onProductSelect={handleAddProduct}
                  currentProductId={initialProduct.id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {products.map((product, index) => (
            <div key={product.id} className="bg-white rounded-lg p-6 border relative">
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="aspect-square mb-4">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {products.length < 3 && (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed p-6 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 mb-4">Add another product to compare</p>
              <CompareSearchBar
                type={type}
                onProductSelect={handleAddProduct}
                currentProductId={initialProduct.id}
              />
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {products.length > 1 && (
          <div className="bg-white rounded-lg border p-6">
            <ComparisonTable
              selectedProducts={products}
              currentProduct={products[0]}
              type={type}
              onRemove={handleRemoveProduct}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}