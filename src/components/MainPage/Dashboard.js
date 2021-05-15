import React, { useEffect } from "react";
import RunningStats from "./RunningStats/RunningStats";
import MainPageHeader from "./MainPageHeader";
import NavigationMenuBootstrap from "./NavigationMenuBootstrap";
import MyRuns from "./MyRuns/MyRuns";
import Community from "./Community/Community";
import { fetchRuns, runActions } from "../../store/run-slice";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  const display = useSelector((state) => state.ui.displaySection);
  const tg = useSelector((state) => state.run.fetchToggle);
  const { currentUser } = useAuth();

  function onTg() {
    dispatch(runActions.toggleToFetch());
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchRuns(currentUser.email));
      console.log("fetching");
    }, 300);
  }, [currentUser.email, dispatch, tg]);

  return (
    <React.Fragment>
      <MainPageHeader />
      <NavigationMenuBootstrap />
      {display === "a" && <MyRuns toggle={onTg} />}
      {display === "b" && <RunningStats />}
      {display === "c" && <Community />}
    </React.Fragment>
  );
}
