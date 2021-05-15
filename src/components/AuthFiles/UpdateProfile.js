import React, { useState } from "react";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../Hooks/use-input";

export default function UpdateProfile() {
  const { currentUser, updatePassword, updateEmail } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  /////////INPUT VALIDATION ////////////////

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
  } = useInput((value) => value.length > 5 || value.length === 0, "");

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
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  /////////INPUT VALIDATION ////////////////

  function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");

    if (enteredEmail !== currentUser.email) {
      promises.push(updateEmail(enteredEmail));
    }
    if (enteredrePassword) {
      promises.push(updatePassword(enteredrePassword));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
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
                  placeholder={currentUser.email}
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
                  placeholder="Leave blank to keep the same"
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
                  placeholder="Leave blank to keep the same"
                />
                <Form.Control.Feedback type="invalid">
                  Password does not match
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Button
              disabled={loading || !formIsValid}
              className="w-100"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
