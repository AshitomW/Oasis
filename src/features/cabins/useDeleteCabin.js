import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id), // mutationFn: deleteCabin
    onSuccess: () => {
      toast.success("Cabin Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
