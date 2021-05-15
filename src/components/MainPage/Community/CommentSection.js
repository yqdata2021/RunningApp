import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputGroup, NavItem } from "react-bootstrap";
import useInput from "../../../Hooks/use-input";
import { runActions } from "../../../store/run-slice";
import classes from "../../CSS/Comment.module.css";

import CommentItem from "./CommentItem";

function CommentSection(props) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const {
    value: enteredcomment,
    isValid: enteredcommentIsValid,
    hasError: commentInputHasError,
    valueChangeHandler: commentChangedHandler,
    inputBlurHandler: commentBlurHandler,
  } = useInput((value) => value.length <= 140, "");

  const name = useSelector((state) => state.run.userName);
  console.log(typeof name.name);

  async function onSubmitHandler(e) {
    e.preventDefault();
    const updateComment = { name: name.name, comment: enteredcomment };

    /////// POST TO DATABASE ////////////
    try {
      const response = await fetch(
        `https://auth-dev-3bcab-default-rtdb.firebaseio.com/runs/${props.item.id}/comment.json`,
        {
          method: "POST",
          body: JSON.stringify(updateComment),
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
    dispatch(runActions.toggleToFetch());
    props.toggle();
    props.togo();
  }
  ////////// ABOVE POST TO DATABASE ///////////////
  let truncComment = [];
  let cloneComment = { ...props.item.comment };

  for (const key in cloneComment) {
    if (key != 0) {
      truncComment.push({
        name: cloneComment[key].name,
        comment: cloneComment[key].comment,
        key: key,
      });
    }
  }

  return (
    <section className={classes.main}>
      <div className={classes.commentSection}>
        {truncComment.map((item) => (
          <CommentItem
            item={item}
            name={name.name}
            key={item.key}
            runID={props.item.id}
          />
        ))}
      </div>

      <Form onSubmit={onSubmitHandler} className="mt-2">
        <Form.Group controlId="comment">
          <InputGroup hasValidation>
            <Form.Control
              required
              onChange={commentChangedHandler}
              onBlur={commentBlurHandler}
              value={enteredcomment}
              isInvalid={commentInputHasError}
              placeholder="say something..."
              required
              as="textarea"
              rows={2}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a comment between 1 and 140 characters
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button disabled={!enteredcommentIsValid} type="submit">
          POST
        </Button>
      </Form>
    </section>
  );
}

export default CommentSection;
