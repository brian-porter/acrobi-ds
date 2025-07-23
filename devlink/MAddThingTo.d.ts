import * as React from "react";
import * as Types from "./types";

declare function MAddThingTo(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  listMap?: Types.Devlink.Slot;
  filterMap?: Types.Devlink.Slot;
  fldOnChange?: Types.Builtin.Text;
  doClick?: Types.Devlink.RuntimeProps;
  listItmExample?: Types.Visibility.VisibilityConditions;
  listItmClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
