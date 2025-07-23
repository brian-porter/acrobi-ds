import * as React from "react";
import * as Types from "./types";

declare function ListItm(props: {
  as?: React.ElementType;
  exampleListItm?: Types.Visibility.VisibilityConditions;
  listItmCtrlMap?: Types.Devlink.Slot;
  exampleListItmCtrl?: Types.Visibility.VisibilityConditions;
  gttrBdg?: Types.Visibility.VisibilityConditions;
  gttrGttrBdgPin?: Types.Visibility.VisibilityConditions;
  gttrGttrBdgAlarm?: Types.Visibility.VisibilityConditions;
  gttrGttrBdgBkmrk?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
