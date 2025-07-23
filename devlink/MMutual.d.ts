import * as React from "react";
import * as Types from "./types";

declare function MMutual(props: {
  as?: React.ElementType;
  group?: Types.Visibility.VisibilityConditions;
  groupCancelClick?: Types.Devlink.RuntimeProps;
  groupList?: Types.Visibility.VisibilityConditions;
  groupMap?: Types.Devlink.Slot;
  groupExample?: Types.Visibility.VisibilityConditions;
  groupEmpty?: Types.Visibility.VisibilityConditions;
  peep?: Types.Visibility.VisibilityConditions;
  peepCancelClick?: Types.Devlink.RuntimeProps;
  peepList?: Types.Visibility.VisibilityConditions;
  peepMap?: Types.Devlink.Slot;
  peepExample?: Types.Visibility.VisibilityConditions;
  peepEmpty?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
