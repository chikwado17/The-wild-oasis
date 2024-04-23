import React, { useState } from "react";
import Modal from "../../ui/Modal";
import EditCabinForm from "./EditCabinForm";
import { HiPencil } from "react-icons/hi";
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

const EditCabin = ({ cabin }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <StyledButton onClick={() => setIsOpenModal((show) => !show)}>
        <HiPencil /> Edit
      </StyledButton>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal((c) => !c)}>
          <EditCabinForm
            cabin={cabin}
            onCloseModal={() => setIsOpenModal((c) => !c)}
          />
        </Modal>
      )}
    </div>
  );
};

export default EditCabin;
