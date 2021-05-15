import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const runslice = createSlice({
  name: "run",
  initialState: {
    items: [],
    userName: {},
    userNameList: {},
    fetchToggle: false,
  },
  reducers: {
    updateRuns(state, action) {
      state.items = action.payload.items;
      // state.userName = action.payload.name;
    },
    updateName(state, action) {
      state.userName = action.payload.name;
      state.userNameList = action.payload.nameList;
    },
    toggleToFetch(state) {
      state.fetchToggle = !state.fetchToggle;
    },
  },
});
export function fetchRuns(currentUser) {
  return async (dispatch) => {
    dispatch(
      uiActions.fetchState({
        status: "Loading...",
        message: "Loading...",
      })
    );
    //// Define Fetch Function /////
    async function getruns() {
      const response = await fetch(
        "https://auth-dev-3bcab-default-rtdb.firebaseio.com/runs.json"
      );
      const runData = await response.json();

      const loadedData = [];
      for (const key in runData) {
        const calcPace = runData[key].timetosecond / 60 / runData[key].distance;
        let minutes = Math.floor(calcPace).toString();
        if (minutes.length === 1) {
          minutes = "0" + minutes;
        }
        let seconds = (runData[key].timetosecond % 60).toString();
        if (seconds.length === 1) {
          seconds = "0" + seconds;
        }
        const pace = `${minutes}:${seconds}`;
        loadedData.push({
          id: key,
          key: key,
          type: runData[key].type,
          date: runData[key].date,
          distance: runData[key].distance,
          city: runData[key].city,
          time: runData[key].time,
          timetosecond: runData[key].timetosecond,
          user: runData[key].user,
          pace: pace,
          calcPace: calcPace,
          email: runData[key].email,
          like: runData[key].like,
          comment: runData[key].comment,
        });
      }
      return loadedData;
    }

    async function getnames() {
      const response = await fetch(
        "https://auth-dev-3bcab-default-rtdb.firebaseio.com/nickname.json"
      );
      const nameData = await response.json();
      const loadedNameData = [];
      for (const key in nameData) {
        loadedNameData.push({
          name: nameData[key].nickName,
          user: nameData[key].user,
        });
      }

      return loadedNameData;
    }

    try {
      ///// Call Fetch //////
      const loadedData = await getruns();
      const loadedName = await getnames();
      //// Assemble //////

      const userName = loadedName.find((x) => x.user === currentUser);

      dispatch(
        runActions.updateName({
          name: userName,
          nameList: loadedName,
        })
      );

      dispatch(
        runActions.updateRuns({
          items: loadedData,
        })
      );

      if (loadedData.find((x) => x.email === currentUser)) {
        dispatch(
          uiActions.fetchState({
            status: "Success",
            message: "",
          })
        );
      } else {
        dispatch(
          uiActions.fetchState({
            status: "Empty",
            message: "No Runs yet, add one!",
          })
        );
      }
    } catch (error) {
      dispatch(
        uiActions.fetchState({
          status: "Error",
          message: "Fetch Data Failed",
        })
      );
    }
  };
}

export const runActions = runslice.actions;
export default runslice;
