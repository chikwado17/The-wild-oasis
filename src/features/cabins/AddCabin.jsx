import React, { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>Add Cabin</Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal((c) => !c)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal((c) => !c)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
