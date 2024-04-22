import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationKey: ["settings"],
    mutationFn: (newSettings) => updateSetting(newSettings),
    onSuccess: () => {
      toast.success("Setting updated successfully"),
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isUpdating };
};
