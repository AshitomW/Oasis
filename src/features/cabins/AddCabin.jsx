import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

export default function AddCabin() {
  return (
    // <>
    //   <Button onClick={() => setIsOpenModal((state) => !state)}>
    //     Add new cabin
    //   </Button>
    //   {isOpenModal && (
    //     <Modal onClose={() => setIsOpenModal(false)}>
    //       <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
    //     </Modal>
    //   )}
    // </>
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
