import React, { useState } from "react";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete";

const ConfirmDeleteCabin = ({ isDeleting, mutate, cabinId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <button
        disabled={isDeleting}
        onClick={() => setIsOpenModal((show) => !show)}
      >
        <HiTrash />
      </button>

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
