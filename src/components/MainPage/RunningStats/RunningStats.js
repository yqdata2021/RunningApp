import React from "react";
import { useSelector } from "react-redux";
import classes from "../../CSS/MyRuns.module.css";
import RunChart from "./RunChart";
import { useAuth } from "../../../contexts/AuthContext";

function RunningStats() {
  const { currentUser } = useAuth();
  const runs = useSelector((state) => state.run.items);
  let totalDistance = 0;

  const runlean = runs.slice().filter((a) => a.email === currentUser.email);

  for (let x of runlean) {
    totalDistance = totalDistance + Number(x.distance);
  }

  return (
    <React.Fragment>
      <div className={classes.timed}>
        <p className={classes.animates3}>Lifetime Totals:</p>
        <p className={classes.animates1}>{`Runs: ${runlean.length}`}</p>
        <p className={classes.animates2}>{`Distance: ${totalDistance.toFixed(
          2
        )} km`}</p>
      </div>
      <RunChart />
    </React.Fragment>
  );
}

export default RunningStats;
