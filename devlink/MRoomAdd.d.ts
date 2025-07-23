import * as React from "react";
import * as Types from "./types";

declare function MRoomAdd(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  typePHoldSrc?: React.ReactNode;
  typePHoldClr?: Types.Builtin.Text;
  typeSelectDrpHide?: Types.Visibility.VisibilityConditions;
  typeSelectMap?: Types.Devlink.Slot;
  sectionPHoldSrc?: React.ReactNode;
  sectionPHoldClr?: Types.Builtin.Text;
  sectionSelectDrpHide?: Types.Visibility.VisibilityConditions;
  sectionSelectMap?: Types.Devlink.Slot;
  nameChange?: Types.Builtin.Text;
  tagChange?: Types.Builtin.Text;
  badgeMap?: Types.Devlink.Slot;
  badgeExample?: Types.Visibility.VisibilityConditions;
  descChange?: Types.Builtin.Text;
  accessMap?: Types.Devlink.Slot;
  accessExampleMap?: Types.Visibility.VisibilityConditions;
  accessAddClick?: Types.Devlink.RuntimeProps;
  erase?: Types.Visibility.VisibilityConditions;
  eraseClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
