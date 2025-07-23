import * as React from "react";
import * as Types from "./types";

declare function PickYr(props: {
  as?: React.ElementType;
  prev?: Types.Visibility.VisibilityConditions;
  prevClick?: Types.Devlink.RuntimeProps;
  next?: Types.Visibility.VisibilityConditions;
  nextClick?: Types.Devlink.RuntimeProps;
  yrMap?: Types.Devlink.Slot;
  yr?: React.ReactNode;
  yrActive?: Types.Builtin.Text;
  yrClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
