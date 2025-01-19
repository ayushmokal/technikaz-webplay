import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MobileProduct, LaptopProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface CompareSearchBarProps {
  type: 'mobile' | 'laptop';
  onProductSelect: (product: MobileProduct | LaptopProduct) => void;
  currentProductId: string;
}

export function CompareSearchBar({ type, onProductSelect, currentProductId }: CompareSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['product-search', type, searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      
      const tableName = type === 'laptop' ? 'laptops' : 'mobile_products';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .neq('id', currentProductId)
        .ilike('name', `%${searchQuery}%`)
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: searchQuery.length > 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleProductSelect = (product: MobileProduct | LaptopProduct) => {
    onProductSelect(product);
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search products to compare..."
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className="w-full"
      />

      <Dialog open={isOpen && searchResults.length > 0} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>Select Product to Compare</DialogTitle>
          <ScrollArea className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <Button
                    key={product.id}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-gray-100"
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="flex items-center gap-2">
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.brand} • ₹{product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}