import { useEffect, useState } from "react";

import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);

  const { data, isLoading } = useBooking();
  const { mutate: checkin, isCheckingin } = useCheckin();

  const { data: settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(data?.isPaid ?? false);
  }, [data]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = data;

  const optionalBreakFastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakFast) {
      //store this when a user selects breakfast
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakFastPrice,
          totalPrice: totalPrice + optionalBreakFastPrice,
        },
      });
    } else {
      // store this when a user chooses not to add breakfast
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              setAddBreakFast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
            checked={addBreakFast}
            disabled={addBreakFast}
            id="breakfast"
          >
            Want to add breakFast for {formatCurrency(optionalBreakFastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingin}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakFastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakFastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingin} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
