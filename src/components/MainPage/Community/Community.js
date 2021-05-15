import React, { useState } from "react";
import classes from "../../CSS/Community.module.css";
import RecentRuns from "./RecentRuns";
import TotalRunDist from "./Ranking";

function Community() {
  const [smallScreen, setSmallScreen] = useState(true);

  function showButton() {
    if (window.innerWidth >= 800) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }
  console.log(window.innerWidth);

  window.addEventListener("resize", showButton);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.column1}>
          <h2 className="mb-4 mt-2">Recent Runs</h2>
          <RecentRuns />
        </div>

        {window.innerWidth >= 800 && smallScreen && (
          <div className={classes.column2}>
            <h2 className={classes.header}>Ranking</h2>
            <TotalRunDist />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Community;
