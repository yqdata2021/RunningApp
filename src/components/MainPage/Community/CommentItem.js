import React, { useState } from "react";
import CloseIcon from "../MyRuns/SVG/CloseIcon";
import classes from "../../CSS/Comment.module.css";
import { runActions } from "../../../store/run-slice";
import { useDispatch } from "react-redux";

function CommentItem(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  async function onClickHandler() {
    try {
      const response = await fetch(
        `https://auth-dev-3bcab-default-rtdb.firebaseio.com/runs/${props.runID}/comment/${props.item.key}.json`,
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
    <div className={classes.individualComment}>
      <div style={{ fontWeight: "bold" }} className={classes.name}>
        <div>{props.item.name}</div>
        <div>
          {props.item.name === props.name && (
            <button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "grey",
                outline: "none",
              }}
              onClick={onClickHandler}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
      <div className="mb-2 ml-2">{props.item.comment}</div>
    </div>
  );
}

export default CommentItem;
