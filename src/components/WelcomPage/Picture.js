import classes from "../CSS/Picture.module.css";
import runningImage from "./Running.jpg";
import React from "react";

function Picture() {
  return (
    <React.Fragment>
      <div className={classes["main-image"]}>
        <img src={runningImage} alt="Running Pic" />
      </div>
      <section className={classes.introduction}>
        <p>An online running community</p>
        <p>
          where you can track your running metris and compare your progress with
          others.
        </p>
      </section>
    </React.Fragment>
  );
}

export default Picture;
