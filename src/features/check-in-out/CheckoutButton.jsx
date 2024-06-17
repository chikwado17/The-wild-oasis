import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, IsCheckingOut } = useCheckOut();

  return (
    <Button
      disabled={IsCheckingOut}
      variation="primary"
      onClick={() => checkOut(bookingId)}
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
