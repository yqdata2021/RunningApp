import React, { useState } from "react";
import classes from "../../CSS/MyRuns.module.css";
import NewRunForm from "./NewRunForm";
import { Modal, Button, ModalBody, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
function AddNewRun(props) {
  const [modalShow, setModalShow] = useState(false);

  function handlerClose() {
    setModalShow(false);
    props.onClose();
  }
  // console.log(modalShow);
  return (
    <>
      <div className={classes.btn}>
        <Button
          variant="outline-success"
          size="lg"
          block
          className="mt-5"
          onClick={() => setModalShow(true)}
        >
          Add New Runs
        </Button>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <ModalBody>
          <ModalHeader closeButton>
            <ModalTitle>Add New Runs</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <NewRunForm closeModal={handlerClose} />
          </ModalBody>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddNewRun;
