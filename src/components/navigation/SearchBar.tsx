import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  created_at: string;
  slug: string;
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return [];
      
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, category, created_at, slug")
        .ilike("title", `%${query}%`)
        .limit(5);

      if (error) throw error;
      return data as SearchResult[];
    },
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search articles...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput 
            placeholder="Type to search..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Articles">
              {results.map((result) => (
                <CommandItem 
                  key={result.id}
                  value={result.title}
                  onSelect={() => {
                    window.location.href = `/article/${result.slug}`;
                  }}
                >
                  <div className="flex flex-col">
                    <span>{result.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {result.category}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}