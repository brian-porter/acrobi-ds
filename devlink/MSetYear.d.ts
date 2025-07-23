import * as React from "react";
import * as Types from "./types";

declare function MSetYear(props: {
  as?: React.ElementType;
  clearClick?: Types.Devlink.RuntimeProps;
  prev?: Types.Visibility.VisibilityConditions;
  prevClick?: Types.Devlink.RuntimeProps;
  next?: Types.Visibility.VisibilityConditions;
  nextClick?: Types.Devlink.RuntimeProps;
  yrMap?: Types.Devlink.Slot;
  yr?: React.ReactNode;
  yrActive?: Types.Builtin.Text;
  yrClick?: Types.Devlink.RuntimeProps;
  backClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
