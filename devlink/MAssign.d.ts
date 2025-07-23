import * as React from "react";
import * as Types from "./types";

declare function MAssign(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  peepMap?: Types.Devlink.Slot;
  peepItemClick?: Types.Devlink.RuntimeProps;
  peepItmExample?: Types.Visibility.VisibilityConditions;
  groupMap?: Types.Devlink.Slot;
  groupItmClick?: Types.Devlink.RuntimeProps;
  groupItmExample?: Types.Visibility.VisibilityConditions;
  emptyPeep?: Types.Visibility.VisibilityConditions;
  emptyInviteClick?: Types.Devlink.RuntimeProps;
  emptyFindPeepClick?: Types.Devlink.RuntimeProps;
  emptyGroup?: Types.Visibility.VisibilityConditions;
  emptyAddGroupClick?: Types.Devlink.RuntimeProps;
  emptyFindGroupClick?: Types.Devlink.RuntimeProps;
  scanClick?: Types.Devlink.RuntimeProps;
  fldChipMap?: Types.Devlink.Slot;
  chipMapExample?: Types.Visibility.VisibilityConditions;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
