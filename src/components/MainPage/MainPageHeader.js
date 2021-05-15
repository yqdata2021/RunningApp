import classes from "../CSS/Header.module.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function MainPageHeader() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const name = useSelector((state) => state.run.userName);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/welcome");
    } catch {
      setError("Failed to log out");
    }
    if (error) {
      alert(error);
    }
  }
  return (
    <React.Fragment>
      <header className={classes.header} style={{ position: "static" }}>
        <h5>{`Welcome, ${name.name ? name.name : ""}`}</h5>
        <div>
          <Link to="/update-profile" className="btn btn-primary  mr-4 btn-sm">
            Update Profile
          </Link>
          <Button size="sm" variant="outline-primary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </header>
    </React.Fragment>
  );
}
export default MainPageHeader;
