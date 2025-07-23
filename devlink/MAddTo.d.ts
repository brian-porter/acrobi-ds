import * as React from "react";
import * as Types from "./types";

declare function MAddTo(props: {
  as?: React.ElementType;
  titleSrc?: React.ReactNode;
  cancelClick?: Types.Devlink.RuntimeProps;
  list?: Types.Visibility.VisibilityConditions;
  listMap?: Types.Devlink.Slot;
  listItmExample?: Types.Visibility.VisibilityConditions;
  group?: Types.Visibility.VisibilityConditions;
  peepMap?: Types.Devlink.Slot;
  groupMap?: Types.Devlink.Slot;
  fldChipMap?: Types.Devlink.Slot;
  chipMapExample?: Types.Visibility.VisibilityConditions;
  doClick?: Types.Devlink.RuntimeProps;
  empty?: Types.Visibility.VisibilityConditions;
  emptyHlineSrc?: React.ReactNode;
  emptySecBtnTxtSrc?: React.ReactNode;
  emptySecBtnClick?: Types.Devlink.RuntimeProps;
  emptyPrimeBtnTxtSrc?: React.ReactNode;
  emptyPrimeBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
