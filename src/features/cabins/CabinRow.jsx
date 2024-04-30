import styled from "styled-components";
import { formatCurrency } from "./../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiDocumentDuplicate } from "react-icons/hi";
import EditCabin from "./EditCabin";
import ConfirmDeleteCabin from "./ConfirmDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const StyledButton = styled.div`
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const CabinRow = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const { isCreating, createCabin } = useCreateCabin();

  //from useDeleteCabin hooks
  const { isDeleting, mutate } = useDeleteCabin();

  //function to handle duplication of cabin
  const handleDuplicateCabin = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  };

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt="cabin image" />
        <Cabin>{name} </Cabin>
        <div>Fits up to {maxCapacity} guests </div>
        <Price>{formatCurrency(regularPrice)}</Price>

        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <StyledButton>
          <button disabled={isCreating} onClick={handleDuplicateCabin}>
            <HiDocumentDuplicate />
          </button>
          <EditCabin cabin={cabin} />
          <ConfirmDeleteCabin
            cabinId={cabinId}
            isDeleting={isDeleting}
            mutate={mutate}
          />
        </StyledButton>
      </TableRow>
    </>
  );
};

export default CabinRow;
