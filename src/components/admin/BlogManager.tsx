import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogTable } from "./BlogTable";
import { BlogDetailsDialog } from "./BlogDetailsDialog";
import { BlogEditDialog } from "./BlogEditDialog";
import { useToast } from "@/hooks/use-toast";

export function BlogManager() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedBlogForEdit, setSelectedBlogForEdit] = useState(null);
  const { toast } = useToast();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) throw error;
      return data;
    }
  });

  const handleDelete = async (id) => {
    try {
      await supabase.from("blogs").delete().eq("id", id);
      refetch();
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog",
      });
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlogForEdit(blog);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseDetails = () => {
    setSelectedBlog(null);
  };

  return (
    <div>
      <BlogTable
        blogs={blogs}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />

      {selectedBlog && (
        <BlogDetailsDialog
          blog={selectedBlog}
          onClose={handleCloseDetails}
        />
      )}

      {selectedBlogForEdit && (
        <BlogEditDialog
          blog={selectedBlogForEdit}
          onClose={() => setSelectedBlogForEdit(null)}
          onSuccess={() => {
            setSelectedBlogForEdit(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
