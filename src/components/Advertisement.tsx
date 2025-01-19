import { cn } from "@/lib/utils";

interface AdvertisementProps {
  className?: string;
}

export function Advertisement({ className }: AdvertisementProps) {
  return (
    <div className={cn(
      "w-full bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200",
      className
    )}>
      <div className="aspect-[21/3] flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
        <span className="text-gray-500 text-sm">Advertisement</span>
      </div>
    </div>
  );
}