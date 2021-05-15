import React from "react";
import classes from "../../CSS/Ranking.module.css";
import { useSelector } from "react-redux";
import NumberOfRuns from "./NumberOfRuns";
import RunTimes from "./RunTimes";
import RunDist from "./RunDist";

function TotalRunDist() {
  const runs = useSelector((state) => state.run.items);
  const name = useSelector((state) => state.run.userNameList);
  console.log(runs);
  console.log(name);
  //////////// NUMBER OF RUNS PAST 7 DAYS ////////////
  let listruns = [];
  for (const x of name) {
    let count = 0;
    for (const y of runs) {
      if (
        (new Date() - new Date(y.date)) / (1000 * 60 * 60 * 24) < 8 &&
        y.user === x.name
      ) {
        count++;
      }
    }
    let item = {};
    item["name"] = x.name;
    item["count"] = count;
    listruns.push(item);
  }
  listruns.sort((a, b) => b.count - a.count);
  for (const x of listruns) {
    x["rank"] = listruns.indexOf(x);
  }
  console.log(listruns);

  //////////// RUN TIME PAST 7 DAYS ////////////

  let listruntime = [];
  for (const x of name) {
    let count = 0;
    for (const y of runs) {
      if (
        (new Date() - new Date(y.date)) / (1000 * 60 * 60 * 24) < 8 &&
        y.user === x.name
      ) {
        count += y.timetosecond;
      }
    }
    let item = {};
    item["name"] = x.name;
    item["count"] = count;
    listruntime.push(item);
  }
  listruntime.sort((a, b) => b.count - a.count);
  for (const x of listruntime) {
    x["rank"] = listruntime.indexOf(x);
  }
  console.log(listruntime);

  /////////////////// LIFE TIME RUN DISTANCE /////////////

  let listrundist = [];
  for (const x of name) {
    let count = 0;
    for (const y of runs) {
      if (y.user === x.name) {
        count += Number(y.distance);
      }
    }
    let item = {};
    item["name"] = x.name;
    item["count"] = count;
    listrundist.push(item);
  }
  listrundist.sort((a, b) => b.count - a.count);
  for (const x of listrundist) {
    x["rank"] = listrundist.indexOf(x);
  }
  console.log(listrundist);

  ////////////////// ASSEMBLE /////////////////

  return (
    <React.Fragment>
      <div className={classes.box1}>
        <h5 className={classes.ranking}> # of Runs Past 7 Days</h5>
        {listruns.map((item) => (
          <NumberOfRuns
            name={item.name}
            count={item.count}
            key={item.rank}
            rank={item.rank}
          />
        ))}
      </div>
      <div className={classes.box2}>
        <h5 className={classes.ranking}> Run Duration Past 7 Days</h5>
        {listruntime.map((item) => (
          <RunTimes
            name={item.name}
            count={item.count}
            key={item.rank}
            rank={item.rank}
          />
        ))}
      </div>
      <div className={classes.box3}>
        <h5 className={classes.ranking}>Life Time Run Distance</h5>
        {listrundist.map((item) => (
          <RunDist
            name={item.name}
            count={item.count}
            key={item.rank}
            rank={item.rank}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default TotalRunDist;
