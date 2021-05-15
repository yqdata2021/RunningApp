import React, { useState } from "react";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../Hooks/use-input";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  ////////////// INPUT VALIDATION /////////////

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(
    (value) =>
      value.trim().length > 3 &&
      value[0] !== " " &&
      value.slice(-1) !== " " &&
      value.trim().length < 20,
    ""
  );

  const emailForm =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.match(emailForm), "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.length > 5 && value.length < 15, "");

  const {
    value: enteredrePassword,
    isValid: enteredrePasswordIsValid,
    hasError: repasswordInputHasError,
    valueChangeHandler: repasswordChangedHandler,
    inputBlurHandler: repasswordBlurHandler,
  } = useInput((value) => value === enteredPassword, "");

  let formIsValid = false;
  if (
    enteredrePasswordIsValid &&
    enteredPasswordIsValid &&
    enteredEmailIsValid &&
    enteredNameIsValid
  ) {
    formIsValid = true;
  }

  ////////////// INPUT VALIDATION /////////////

  async function handleSubmit(e) {
    e.preventDefault();
    const nameInfo = {
      user: enteredEmail,
      nickName: enteredName,
    };

    try {
      setError("");
      setLoading(true);
      await signup(enteredEmail, enteredPassword);
    } catch {
      setError("Failed to create an account,try a different E-mail address");
    }

    try {
      const response = await fetch(
        "https://auth-dev-3bcab-default-rtdb.firebaseio.com/nickname.json",
        {
          method: "POST",
          body: JSON.stringify(nameInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const names = await response.json();
      dispatch(uiActions.displays("a"));
      history.push("/");
    } catch (error) {
      setError("Send data failed");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  onChange={emailChangedHandler}
                  onBlur={emailBlurHandler}
                  value={enteredEmail}
                  isInvalid={emailInputHasError}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter valid Email
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="password"
                  onChange={passwordChangedHandler}
                  onBlur={passwordBlurHandler}
                  value={enteredPassword}
                  isInvalid={passwordInputHasError}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password with at least 6 characters
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="password"
                  onChange={repasswordChangedHandler}
                  onBlur={repasswordBlurHandler}
                  value={enteredrePassword}
                  isInvalid={repasswordInputHasError}
                />
                <Form.Control.Feedback type="invalid">
                  Password does not match
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group id="nickname">
              <Form.Label>Nickname</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  onChange={nameChangedHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                  isInvalid={nameInputHasError}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name with at least 4 characters (no space at
                  two ends)
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Button
              disabled={loading || !formIsValid}
              className="w-100"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
