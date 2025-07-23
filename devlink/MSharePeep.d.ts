import * as React from "react";
import * as Types from "./types";

declare function MSharePeep(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  groupAddClick?: Types.Devlink.RuntimeProps;
  peepAddClick?: Types.Devlink.RuntimeProps;
  peepMap?: Types.Devlink.Slot;
  exampleListItem?: Types.Visibility.VisibilityConditions;
  peepListItemClick?: Types.Devlink.RuntimeProps;
  groupListItemClick?: Types.Devlink.RuntimeProps;
  groupMap?: Types.Devlink.Slot;
}): React.JSX.Element;
