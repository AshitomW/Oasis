import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin, // mutationFn : newCabin => createCabin(newCabin)
    onSuccess: () => {
      toast.success("New Cabin Successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createCabin };
}
