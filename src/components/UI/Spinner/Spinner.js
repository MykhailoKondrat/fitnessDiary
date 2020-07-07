import React from "react";
import classes from "./Spinner.module.scss";

const Spinner = (props) => {
  return (
    <div className={classes.spinner}>
      <div className={classes.skcubegrid}>
        <div className={[classes.skcube, classes.skcube1].join(" ")} />
        <div className={[classes.skcube, classes.skcube2].join(" ")} />
        <div className={[classes.skcube, classes.skcube3].join(" ")} />
        <div className={[classes.skcube, classes.skcube4].join(" ")} />
        <div className={[classes.skcube, classes.skcube5].join(" ")} />
        <div className={[classes.skcube, classes.skcube6].join(" ")} />
        <div className={[classes.skcube, classes.skcube7].join(" ")} />
        <div className={[classes.skcube, classes.skcube8].join(" ")} />
        <div className={[classes.skcube, classes.skcube9].join(" ")} />
      </div>
    </div>
  );
};

export default Spinner;
