import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <AspectRatio ratio={1} className={cn("bg-muted", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="object-cover w-full h-full rounded-md"
      />
    </AspectRatio>
  );
}