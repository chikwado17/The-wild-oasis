import React, { useState } from "react";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const ConfirmDeleteCabin = ({ isDeleting, mutate, cabinId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <StyledButton
        disabled={isDeleting}
        onClick={() => setIsOpenModal((show) => !show)}
      >
        <HiTrash />
        Delete
      </StyledButton>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal((c) => !c)}>
          <ConfirmDelete
            disabled={isDeleting}
            onConfirm={() => mutate(cabinId)}
            onCloseModal={() => setIsOpenModal((show) => !show)}
            resourceName={"cabins"}
          />
        </Modal>
      )}
    </div>
  );
};

export default ConfirmDeleteCabin;
