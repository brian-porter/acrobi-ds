import * as React from "react";
import * as Types from "./types";

declare function MMove(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  listMap?: Types.Devlink.Slot;
  exampleListItm?: Types.Visibility.VisibilityConditions;
  filterMap?: Types.Devlink.Slot;
  exampleFilterMap?: Types.Visibility.VisibilityConditions;
  lBtnClick?: Types.Devlink.RuntimeProps;
  fldClick?: Types.Devlink.RuntimeProps;
  fldOnChange?: Types.Builtin.Text;
  newBtnClick?: Types.Devlink.RuntimeProps;
  btmShdw?: Types.Builtin.Text;
}): React.JSX.Element;
