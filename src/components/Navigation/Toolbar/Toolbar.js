import React from "react";
import classes from "./Toolbar.module.scss";
import ToolbarButton from "../../UI/Buttons/ToolbarButton/ToolbarButton";
import { ReactComponent as LogoutIcon } from "../../../assets/icons/003-sign-out-option.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/001-check.svg";
import { ReactComponent as GoBackIcon } from "../../../assets/icons/002-chevron-pointing-to-the-left.svg";
import { ReactComponent as MenuIcon } from "../../../assets/icons/004-three-small-square-shapes.svg";
import { ReactComponent as DumbellIcon } from "../../../assets/icons/001-dumbbell.svg";

const Toolbar = (props) => {
  // define right  icon based on passed props - confirmAction for right side and declineAction for left.
  // This is also UX pattern so confirm should be on the right and decline/back/ cancel on the left
  // It could be done with hooks but this props can't be changed by user, only via code

  const figureOutIconToUse = (icon) => {
    let iconOutput = null;
    switch (icon) {
      case "Logout":
        return (iconOutput = <LogoutIcon width="100%" height="32px" />);
      case "Confirm":
        return (iconOutput = <CheckIcon width="100%" height="32px" />);
      case "GoBack":
        return (iconOutput = <GoBackIcon width="100%" height="32px" />);
      case "Menu":
        return (iconOutput = <MenuIcon width="100%" height="32px" />);
      default:
        return (iconOutput = null);
    }
  };
  const confirmIcon = figureOutIconToUse(props.confirmIcon);
  const declineIcon = figureOutIconToUse(props.declineIcon);
  // TODO - conditionally add classes to  tollbar  based on existing of icons.
  // const mystyle = [classes.Toolbar, classes.test].join(" ");
  // className={[classes.Button, classes[props.btnType]].join(' ')}

  return (
    <div className={classes.Toolbar}>
      <ToolbarButton
        className={classes.declineAction}
        click={props.declineAction}
        // hidden={!props.declineIcon}
      >
        {declineIcon}
      </ToolbarButton>
      <p className={classes.Headline}> {props.children}</p>
      <ToolbarButton
        className={classes.confirmAction}
        click={props.confirmAction}
        hidden={!props.confirmIcon}
        // disabled={!props.confirmIcon}
      >
        {confirmIcon}
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
