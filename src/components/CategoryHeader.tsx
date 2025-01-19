import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CategoryHeaderProps {
  title: string;
  subcategories: readonly string[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
}

export function CategoryHeader({
  title,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
}: CategoryHeaderProps) {
  return (
    <div className="border-b mb-8">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center py-6">
          {/* Title on the left */}
          <h1 className="absolute left-0 text-3xl font-bold">{title}</h1>
          
          {/* Subcategories centered */}
          <div className="flex gap-8">
            <button
              onClick={() => onSubcategoryChange("ALL")}
              className={cn(
                "text-lg font-medium hover:text-primary transition-colors hover:border-b-2 hover:border-primary",
                selectedSubcategory === "ALL" && "text-primary border-b-2 border-primary"
              )}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSubcategoryChange(sub)}
                className={cn(
                  "text-lg font-medium hover:text-primary transition-colors hover:border-b-2 hover:border-primary",
                  selectedSubcategory === sub && "text-primary border-b-2 border-primary"
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}