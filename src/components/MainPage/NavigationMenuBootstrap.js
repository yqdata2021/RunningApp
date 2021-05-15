import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

function NavigationMenuBootstrap() {
  const dispatch = useDispatch();

  function onSelecta() {
    dispatch(uiActions.displays("a"));
  }

  function onSelectb() {
    dispatch(uiActions.displays("b"));
  }

  function onSelectc() {
    dispatch(uiActions.displays("c"));
  }

  return (
    <Nav variant="pills" fill={true} defaultActiveKey={"link-1"}>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onSelect={onSelecta}>
          Runs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" onSelect={onSelectb}>
          Stats
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" onSelect={onSelectc}>
          Community
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavigationMenuBootstrap;
