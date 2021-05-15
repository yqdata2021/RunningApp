import classes from "../../CSS/RunItem.module.css";
import React, { useState } from "react";
import CloseIcon from "./SVG/CloseIcon";
import Edit from "./SVG/Edit";
import { Modal, ModalBody, ModalTitle, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useDispatch } from "react-redux";
import { runActions } from "../../../store/run-slice";
import RunEditForm from "./RunEditForm";

function RunItem(props) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [error, setError] = useState(null);

  ///////////////// Handle Edit //////////////
  function editClickHandler() {}

  const item = props.item;
  ////////// Handle Delete /////////////
  async function deleteConfirmHandler() {
    setModalShow(false);
    try {
      const response = await fetch(
        `https://auth-dev-3bcab-default-rtdb.firebaseio.com/runs/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
    } catch (error) {
      setError(error.message);
    }

    if (error) {
      alert(error.message);
      console.log(error);
    }
    dispatch(runActions.toggleToFetch());
  }

  return (
    <React.Fragment>
      {/* delete Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <ModalBody>
          <ModalHeader closeButton>
            <ModalTitle>Delete This Run?</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Button className="mr-3" onClick={deleteConfirmHandler}>
              Confirm
            </Button>
            <Button
              onClick={() => setModalShow(false)}
              variant="outline-primary"
            >
              Cancel
            </Button>
          </ModalBody>
        </ModalBody>
      </Modal>

      {/* editing Modal */}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <ModalBody>
          <ModalHeader closeButton>
            <ModalTitle>
              Editing Runs (Likes and Comments for this run will be cleared!)
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <RunEditForm item={item} />
          </ModalBody>
        </ModalBody>
      </Modal>
      <li
        className={
          props.type === "Free Run"
            ? classes.free
            : props.type === "Ultra Endurance Run"
            ? classes.ultra
            : props.type === "Timed Run"
            ? classes.timed
            : ""
        }
      >
        <div>
          <div className={classes.stat} style={{ fontSize: "1.0rem" }}>
            <div>{`${props.date}`}</div>
            <div>
              <button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  color: "white",
                  outline: "none",
                }}
                onClick={() => setEditModalShow(true)}
              >
                <Edit onClick={editClickHandler} />
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  color: "white",
                  outline: "none",
                }}
                onClick={() => setModalShow(true)}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <div>{`${props.city} Running`}</div>
          <div className={classes.stat}>
            <div>Distance:</div>
            <div>Time:</div>
            <div>pace:</div>
          </div>
          <div className={classes.stat2}>
            <div>{`${props.distance} km`}</div>
            <div>{`${props.time} `}</div>
            <div>{props.pace}</div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
}

export default RunItem;
