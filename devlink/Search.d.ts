import * as React from "react";
import * as Types from "./types";

declare function Search(props: {
  as?: React.ElementType;
  search?: Types.Visibility.VisibilityConditions;
  scanBtn?: Types.Visibility.VisibilityConditions;
  fltrBtn?: Types.Visibility.VisibilityConditions;
  scanBtnClick?: Types.Devlink.RuntimeProps;
  searchFldClick?: Types.Devlink.RuntimeProps;
  fltrBtnClick?: Types.Devlink.RuntimeProps;
  fltrSideFade?: Types.Visibility.VisibilityConditions;
  fltrCellMap?: Types.Devlink.Slot;
  fltrExampleFilterChips?: Types.Visibility.VisibilityConditions;
  filter?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
