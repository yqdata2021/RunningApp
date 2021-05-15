import React, { useState } from "react";
import classes from "../CSS/Header.module.css";
import { Link } from "react-router-dom";
import { Modal, Button, ModalBody, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

function Header() {
  console.log("welcome");
  const [modalShow, setModalShow] = useState(false);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div>Welcome to LetsRun</div>
        <div className={classes.header2}>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Read Me
          </Button>
          <Link to="/login" className="btn btn-primary btn-sm ml-1">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-outline-primary btn-sm ml-1">
            Sign Up
          </Link>
        </div>
      </header>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <ModalBody>
          <ModalHeader closeButton>
            <ModalTitle>Read Me</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Welcome! </p>
            <p>Below is a test account with some records pre-loaded:</p>
            <p style={{ fontWeight: "bold" }}>
              E-mail: test@test.com Password:123123
            </p>
            <p>However, feel free to creat your own account!</p>
            <p>If you find any bugs, please E-mail me at:</p>
            <p style={{ fontWeight: "bold" }}>yangqidata2021@gmail.com</p>
            <p> </p>
            <p style={{ fontSize: "large", color: "red", fontWeight: "bold" }}>
              Have Fun!
            </p>
          </ModalBody>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
export default Header;
