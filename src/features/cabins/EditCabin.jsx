import React, { useState } from "react";
import Modal from "../../ui/Modal";
import EditCabinForm from "./EditCabinForm";
import { HiPencil } from "react-icons/hi";

const EditCabin = ({ cabin }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpenModal((show) => !show)}>
        <HiPencil />
      </button>

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
