import classes from "../../CSS/RunItem.module.css";
import CommentIcon from "./SVG-Button/CommentIcon";
import HeartIcon from "./SVG-Button/HeartIcon";
import HeartFillIcon from "./SVG-Button/HeartFillIcon";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { runActions } from "../../../store/run-slice";
import CommentSection from "./CommentSection";

function RunItemCommunity(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const liked = props.like.find((x) => x === currentUser.email);
  const [like, setLike] = useState(liked);
  const [comment, setComment] = useState(false);

  function commentHandler() {
    setComment((prevComment) => {
      return !prevComment;
    });
  }

  function toggleHandler() {
    setComment((prevComment) => {
      return !prevComment;
    });
  }

  function togoHandler() {
    setComment((prevComment) => {
      return !prevComment;
    });
  }

  async function unlikeHandler() {
    const i = props.like.findIndex((x) => x === currentUser.email);

    let likeList = props.like.slice();

    likeList.splice(i, 1);

    ////Send Data///////////
    try {
      const response = await fetch(
        `https://auth-dev-3bcab-default-rtdb.firebaseio.com/runs/${props.id}/like.json`,
        {
          method: "PUT",
          body: JSON.stringify(likeList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }

    if (error) {
      alert(error.message);
      console.log(error);
    }
    setLike(true);
    dispatch(runActions.toggleToFetch());
    setLike(false);
  }

  async function likeHandler() {
    let likeList = props.item.like.slice();
    likeList.push(currentUser.email);

    ////Send Data///////////
    try {
      const response = await fetch(
        `https://auth-dev-3bcab-default-rtdb.firebaseio.com/runs/${props.id}/like.json`,
        {
          method: "PUT",
          body: JSON.stringify(likeList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }

    if (error) {
      alert(error.message);
      console.log(error);
    }
    setLike(true);
    dispatch(runActions.toggleToFetch());
  }

  return (
    <React.Fragment>
      <li className={classes.community}>
        <div>
          <div>{`${props.date}`}</div>
          <div>{`${props.city} Running`}</div>
          <div className={classes.stat}>
            <div>Distance:</div>
            <div>Time:</div>
            <div>pace:</div>
          </div>
          <div className={classes.stat}>
            <div>{`${props.distance} km`}</div>
            <div>{`${props.time} `}</div>
            <div>{props.pace}</div>
          </div>
        </div>
      </li>
      <div className="mb-4">
        <span className="ml-2">
          {like ? (
            <HeartFillIcon unlike={unlikeHandler} />
          ) : (
            <HeartIcon like={likeHandler} />
          )}
        </span>
        <span className="ml-2 " style={{ color: "grey" }}>
          {props.like.length - 1}
        </span>
        <span className="ml-2">
          <CommentIcon comment={commentHandler} />
        </span>
        <span className="ml-2" style={{ color: "grey" }}>
          {Object.keys(props.item.comment).length - 1}
        </span>
        {comment && (
          <CommentSection
            item={props.item}
            toggle={toggleHandler}
            togo={togoHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default RunItemCommunity;
