import { useSelector } from "react-redux";
import classes from "../../CSS/MyRuns.module.css";
import React from "react";
import RunItemCommunity from "./RunItemCommunity";

function RecentRuns() {
  const runs = useSelector((state) => state.run.items);

  const sortedruns = runs
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <section className={classes.runsCommunity}>
      {sortedruns.map((item) => (
        <div key={item.id}>
          <h4>{item.user}</h4>
          <RunItemCommunity
            id={item.id}
            date={item.date}
            distance={item.distance}
            time={item.time}
            city={item.city}
            pace={item.pace}
            like={item.like}
            comments={item.comments}
            item={item}
          />
        </div>
      ))}
    </section>
  );
}

export default RecentRuns;
