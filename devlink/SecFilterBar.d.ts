import * as React from "react";
import * as Types from "./types";

declare function SecFilterBar(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  fltrDrp?: Types.Visibility.VisibilityConditions;
  fltrSs?: Types.Visibility.VisibilityConditions;
  sort?: Types.Visibility.VisibilityConditions;
  fltrDrpTitleSrc?: React.ReactNode;
  acrdFltrMap?: Types.Devlink.Slot;
  exampleAcrdFltrItm?: Types.Visibility.VisibilityConditions;
  fltrSsMap?: Types.Devlink.Slot;
  exampleFilters?: Types.Visibility.VisibilityConditions;
  sortTitleSrc?: React.ReactNode;
  sortSelectMap?: Types.Devlink.Slot;
}): React.JSX.Element;
