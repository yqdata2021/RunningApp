import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import { Bar } from "react-chartjs-2";
import classes from "../../CSS/MyRuns.module.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

function RunChart() {
  const { currentUser } = useAuth();
  const [year, setYear] = useState("2021");
  const runs = useSelector((state) => state.run.items);

  ////  Dropdown State Change //////
  function onClick2019() {
    setYear("2019");
  }
  function onClick2020() {
    setYear("2020");
  }
  function onClick2021() {
    setYear("2021");
  }
  function onClickAll() {
    setYear("all");
  }

  //// Formating Raw Data ////////
  let init = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let yearinit = [0, 0, 0];
  const runlean = runs.slice().filter((a) => a.email === currentUser.email);
  const runprocessed = [];
  for (const x of runlean) {
    runprocessed.push({
      calcPace: x.calcPace,
      mon: new Date(x.date).getMonth(),
      yr: new Date(x.date).getFullYear(),
      distance: Number(x.distance),
      date: x.date,
    });
  }

  ///////// Raw Data to Chart Ready Data //////
  for (const x of runprocessed) {
    if (x.yr == year) {
      init[x.mon] += x.distance;
    }
  }

  for (const x of runprocessed) {
    yearinit[x.yr - 2019] += x.distance;
  }

  ///////////////// End //////////////////////

  return (
    <div className={classes.chart}>
      <DropdownButton id="dropdown-item-button" title="Year">
        <Dropdown.Item as="button" onClick={onClick2019}>
          2019
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={onClick2020}>
          2020
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={onClick2021}>
          2021
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={onClickAll}>
          All Time
        </Dropdown.Item>
      </DropdownButton>

      {year !== "all" && (
        <Bar
          className={classes.chart}
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: `Distance (km) Year ${year}`,
                data: init,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }}
        />
      )}

      {year === "all" && (
        <Bar
          className={classes.chart}
          data={{
            labels: ["2019", "2020", "2021"],
            datasets: [
              {
                label: "Distance (km)",
                data: yearinit,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default RunChart;
