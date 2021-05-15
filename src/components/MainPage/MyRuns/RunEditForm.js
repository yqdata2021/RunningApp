import React, { useRef, useState } from "react";
import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import useInput from "../../../Hooks/use-input";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { runActions } from "../../../store/run-slice";

function RunEditForm(props) {
  const { currentUser } = useAuth();
  const typeRef = useRef();
  const [error, setError] = useState(null);
  const name = useSelector((state) => state.run.userName);
  const dispatch = useDispatch();

  ////////////// INPUT VALIDATION /////////////

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangedHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput(
    (value) =>
      new Date(value) <= new Date() &&
      new Date(value) >= new Date("2019-01-01"),
    props.item.date
  );

  const {
    value: enteredDist,
    isValid: enteredDistIsValid,
    hasError: distInputHasError,
    valueChangeHandler: distChangedHandler,
    inputBlurHandler: distBlurHandler,
  } = useInput((value) => value > 0, props.item.distance);

  const {
    value: enteredHour,
    isValid: enteredHourIsValid,
    hasError: hourInputHasError,
    valueChangeHandler: hourChangedHandler,
    inputBlurHandler: hourBlurHandler,
  } = useInput(
    (value) => Number.isInteger(Number(value)) && value >= 0 && value <= 99,
    props.item.time.substring(0, 2)
  );

  const {
    value: enteredMin,
    isValid: enteredMinIsValid,
    hasError: minInputHasError,
    valueChangeHandler: minChangedHandler,
    inputBlurHandler: minBlurHandler,
  } = useInput(
    (value) =>
      Number.isInteger(Number(value)) &&
      value >= 0 &&
      value <= 60 &&
      value.length <= 2,
    props.item.time.substring(3, 5)
  );

  const {
    value: enteredSec,
    isValid: enteredSecIsValid,
    hasError: secInputHasError,
    valueChangeHandler: secChangedHandler,
    inputBlurHandler: secBlurHandler,
  } = useInput(
    (value) =>
      Number.isInteger(Number(value)) &&
      value >= 0 &&
      value <= 60 &&
      value.length <= 2,
    props.item.time.substring(6, 8)
  );

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(
    (value) =>
      value.trim().length > 0 && value[0] !== " " && value.slice(-1) !== " ",
    props.item.city
  );

  let formIsValid = false;
  if (
    enteredSecIsValid &&
    enteredMinIsValid &&
    enteredHourIsValid &&
    enteredDistIsValid &&
    enteredDateIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }
  ////////////// INPUT VALIDATION /////////////

  async function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(runActions.toggleToFetch());
    setError(null);
    //////////////Bad can be refractured ///////////////

    let timeHour = "";
    let timeMin = "";
    let timeSec = "";

    if (enteredHour < 10 && enteredHour > 0) {
      timeHour = "0" + enteredHour;
    }
    if (enteredHour == 0) {
      timeHour = "00";
    }
    if (enteredMin < 10 && enteredMin > 0) {
      timeMin = "0" + enteredMin;
    }
    if (enteredMin == 0) {
      timeMin = "00";
    }
    if (enteredSec < 10 && enteredSec > 0) {
      timeSec = "0" + enteredSec;
    }
    if (enteredSec == 0) {
      timeSec = "00";
    }
    ///
    if (enteredHour === "") {
      timeHour = "00";
    }
    if (enteredHour === "") {
      timeHour = "00";
    }
    if (enteredHour === "") {
      timeHour = "00";
    }

    if (Number(enteredHour) > 10 || enteredHour.length === 2) {
      timeHour = enteredHour;
    }
    if (Number(enteredMin) > 10 || enteredMin.length === 2) {
      timeMin = enteredMin;
    }

    if (Number(enteredSec > 10) || enteredSec.length === 2) {
      timeSec = enteredSec;
    }

    //////////////Above Bad can be refractured ///////////////

    const newRun = {
      // id: Math.random(),
      distance: Number(enteredDist).toFixed(2),
      time: `${timeHour}:${timeMin}:${timeSec}`,
      timetosecond:
        Number(enteredHour) * 3600 +
        Number(enteredMin) * 60 +
        Number(enteredSec),
      date: enteredDate,
      city: enteredCity,
      type: typeRef.current.value,
      user: name.name,
      email: currentUser.email,
      like: ["a"],
      comment: ["a"],
    };

    ///////////// SEND DATA TO DATABASE   ////////////////
    try {
      const response = await fetch(
        `https://auth-dev-3bcab-default-rtdb.firebaseio.com/runs/${props.item.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(newRun),
          headers: {
            "Content-Type": "application/json",
          },
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

    ///////////// ABOVE SEND DATA TO DATABASE   ////////////////
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Group id="Date:">
        <Form.Label>Date:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type="date"
            onChange={dateChangedHandler}
            onBlur={dateBlurHandler}
            value={enteredDate}
            isInvalid={dateInputHasError}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a date from 2019-01-01 to today
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group id="Distance">
        <Form.Label>Distance:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type="number"
            step="0.01"
            onChange={distChangedHandler}
            onBlur={distBlurHandler}
            value={enteredDist}
            isInvalid={distInputHasError}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a positive integer
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="Hour">
          <Form.Label>Hour:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Hour"
              onChange={hourChangedHandler}
              onBlur={hourBlurHandler}
              value={enteredHour}
              isInvalid={hourInputHasError}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an integer between 0 and 99
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} controlId="Minute">
          <Form.Label>Minute:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Minute"
              onChange={minChangedHandler}
              onBlur={minBlurHandler}
              value={enteredMin}
              isInvalid={minInputHasError}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an integer between 0 and 60,two digit max
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} controlId="Second">
          <Form.Label>Second:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Second"
              onChange={secChangedHandler}
              onBlur={secBlurHandler}
              value={enteredSec}
              isInvalid={secInputHasError}
            />
            <Form.Control.Feedback type="invalid">
              Please enter an integer between 0 and 60,two digit max
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Group id="type">
        <Form.Label>RunType:</Form.Label>
        <Form.Control as="select" custom required ref={typeRef}>
          <option>Free Run</option>
          <option>Timed Run</option>
          <option>Ultra Endurance Run</option>
        </Form.Control>
      </Form.Group>
      <Form.Group id="Location">
        <Form.Label>City:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            placeholder="City"
            onChange={cityChangedHandler}
            onBlur={cityBlurHandler}
            value={enteredCity}
            isInvalid={cityInputHasError}
          />
          <Form.Control.Feedback type="invalid">
            Please do not start or end with empty space
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Button
        className="w-100"
        type="submit"
        onClick={props.closeModal}
        disabled={!formIsValid}
      >
        Change
      </Button>
    </Form>
  );
}

export default RunEditForm;
