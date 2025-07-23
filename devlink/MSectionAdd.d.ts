import * as React from "react";
import * as Types from "./types";

declare function MSectionAdd(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  nameChange?: Types.Builtin.Text;
  badgeMap?: Types.Devlink.Slot;
  badgeExample?: Types.Visibility.VisibilityConditions;
  erase?: Types.Visibility.VisibilityConditions;
  eraseClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
