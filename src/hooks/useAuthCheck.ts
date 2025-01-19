import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return {
    navigate,
    toast
  };
};