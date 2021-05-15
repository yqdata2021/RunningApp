import React from "react";
import RunItem from "./RunItem";
import classes from "../../CSS/MyRuns.module.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

function RunList(props) {
  function datahandler() {
    props.setSort("date");
  }
  function pacehandler() {
    props.setSort("pace");
  }
  function disthandler() {
    props.setSort("distance");
  }
  return (
    <section className={classes.runs}>
      <DropdownButton id="dropdown-item-button" title="Sort by ">
        <Dropdown.Item as="button" onClick={datahandler}>
          Date
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={pacehandler}>
          Pace
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={disthandler}>
          Distance
        </Dropdown.Item>
      </DropdownButton>
      {props.runs.map((item) => (
        <RunItem
          key={item.id}
          id={item.id}
          type={item.type}
          date={item.date}
          distance={item.distance}
          time={item.time}
          city={item.city}
          pace={item.pace}
          item={item}
        />
      ))}
    </section>
  );
}

export default RunList;
