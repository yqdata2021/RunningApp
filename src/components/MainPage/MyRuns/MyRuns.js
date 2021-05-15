import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddNewRun from "./AddNewRun";
import { useAuth } from "../../../contexts/AuthContext";
import RunList from "./RunList";

function MyRuns(props) {
  // const [runs, setRuns] = useState([]);

  const { currentUser } = useAuth();
  const [sort, setSort] = useState("date");

  let sortedruns = [];

  const dataState = useSelector((state) => state.ui.fetchStatus);

  const message = useSelector((state) => state.ui.message);
  const runs = useSelector((state) => state.run.items);

  function onClickHandler() {
    props.toggle();
  }
  function setSortHandler(value) {
    setSort(value);
  }

  //////////// Sort Data ///////////////
  if (sort === "date") {
    sortedruns = runs
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  if (sort === "pace") {
    sortedruns = runs.slice().sort((a, b) => a.calcPace - b.calcPace);
  }
  if (sort === "distance") {
    sortedruns = runs.slice().sort((a, b) => b.distance - a.distance);
  }

  const result = sortedruns.filter((a) => a.email === currentUser.email);

  ///////////////// Loading State ///////////////

  return (
    <React.Fragment>
      <AddNewRun onClose={onClickHandler} />

      {dataState === "Loading." || dataState === "Loading..." ? (
        <h2 className="text-center mb-3 pt-3">{message}</h2>
      ) : (
        ""
      )}
      {dataState === "Success" ? (
        <RunList runs={result} setSort={setSortHandler} />
      ) : (
        ""
      )}

      {dataState === "Empty" ? (
        <h2 className="text-center mb-3 pt-3">{message}</h2>
      ) : (
        ""
      )}

      {dataState === "Error" && (
        <h2 className="text-center mb-3 pt-3">{message}</h2>
      )}
    </React.Fragment>
  );
}

export default MyRuns;
