import BookingRow from "./BookingRow";
import styled from "styled-components";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.4fr 2fr 2fr 2fr;
  column-gap: 2rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const TableFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resource="Bookings" />;
  }

  return (
    <Menus>
      <Table role="table">
        <TableHeader role="row">
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Actions</div>
          <div></div>
        </TableHeader>

        {bookings.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
        <TableFooter>
          <Pagination count={count} />
        </TableFooter>
      </Table>
    </Menus>
  );
}

export default BookingTable;
