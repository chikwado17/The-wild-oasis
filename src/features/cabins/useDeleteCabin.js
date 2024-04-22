import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  //getting our query client using useQueryClient hooks
  const queryClient = useQueryClient();
  //using useMutation to call our function in react query
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    //function to refetch data if mutation was successful to refresh the UI immediately
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, mutate };
};
