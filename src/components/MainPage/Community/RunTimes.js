import React from "react";
import classes from "../../CSS/Ranking.module.css";

function RunTimes(props) {
  return (
    <div>
      <div>
        {props.rank == 0 && (
          <div className={classes.rank1}>{`${Number(props.rank) + 1}  :  ${
            props.name
          }`}</div>
        )}

        {props.rank > 0 && props.rank < 3 && (
          <div className={classes.rank23}>{`${Number(props.rank) + 1}  :  ${
            props.name
          }`}</div>
        )}

        {props.rank > 2 && props.rank < 6 && (
          <div className={classes.rank46}>{`${Number(props.rank) + 1}  :  ${
            props.name
          }`}</div>
        )}

        {props.rank > 5 && (
          <div className={classes.rank7}>{`${Number(props.rank) + 1}  :  ${
            props.name
          }`}</div>
        )}
      </div>
    </div>
  );
}

export default RunTimes;
