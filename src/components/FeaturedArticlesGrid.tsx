import { BlogFormData } from "@/types/blog";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FeaturedArticlesGridProps {
  articles: BlogFormData[];
}

export function FeaturedArticlesGrid({ articles }: FeaturedArticlesGridProps) {
  if (!articles.length) return null;

  // Get exactly 6 articles (2 main featured + 4 regular)
  const mainFeaturedArticles = articles.slice(0, 2);
  const regularArticles = articles.slice(2, 10);

  return (
    <div className="space-y-6">
      {/* Top Featured Articles Section */}
      <div className="grid grid-cols-12 gap-4">
        {/* First Article - Wide */}
        {mainFeaturedArticles[0] && (
          <div className="col-span-12 lg:col-span-8 h-full">
            <Link to={`/article/${mainFeaturedArticles[0].slug}`} className="group block h-full">
              <div className="relative h-full bg-black rounded-lg overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img
                    src={mainFeaturedArticles[0].image_url || '/placeholder.svg'}
                    alt={mainFeaturedArticles[0].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {mainFeaturedArticles[0].title}
                    </h2>
                    {mainFeaturedArticles[0].meta_description && (
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {mainFeaturedArticles[0].meta_description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Second Article - Square */}
        {mainFeaturedArticles[1] && (
          <div className="col-span-12 lg:col-span-4 h-full">
            <Link to={`/article/${mainFeaturedArticles[1].slug}`} className="group block h-full">
              <div className="relative h-full bg-black rounded-lg overflow-hidden">
                <AspectRatio ratio={16/9} className="md:aspect-[4/3]">
                  <img
                    src={mainFeaturedArticles[1].image_url || '/placeholder.svg'}
                    alt={mainFeaturedArticles[1].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                      {mainFeaturedArticles[1].title}
                    </h2>
                    {mainFeaturedArticles[1].meta_description && (
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {mainFeaturedArticles[1].meta_description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Regular Articles Grid */}
      {regularArticles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regularArticles.map((article) => (
            <Link 
              key={article.slug}
              to={`/article/${article.slug}`}
              className="group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img
                    src={article.image_url || '/placeholder.svg'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.meta_description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {article.meta_description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}