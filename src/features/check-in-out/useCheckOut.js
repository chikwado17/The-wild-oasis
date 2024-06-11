import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: IsCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkOut, IsCheckingOut };
};
