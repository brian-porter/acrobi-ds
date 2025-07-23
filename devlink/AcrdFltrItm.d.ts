import * as React from "react";
import * as Types from "./types";

declare function AcrdFltrItm(props: {
  as?: React.ElementType;
  comp?: Types.Visibility.VisibilityConditions;
  fltrTitleSrc?: React.ReactNode;
  active?: Types.Builtin.Text;
  fltrBdg?: Types.Visibility.VisibilityConditions;
  fltrBdgQty?: React.ReactNode;
  filterSearch?: Types.Visibility.VisibilityConditions;
  filterSlider?: Types.Visibility.VisibilityConditions;
  filterClr?: Types.Visibility.VisibilityConditions;
  filterChoice?: Types.Visibility.VisibilityConditions;
  filterCbox?: Types.Visibility.VisibilityConditions;
  filterExampleFltrSwatch?: Types.Visibility.VisibilityConditions;
  filterClrMap?: Types.Devlink.Slot;
  filterExamleCbox?: Types.Visibility.VisibilityConditions;
  filterCboxMap?: Types.Devlink.Slot;
  filterClearClick?: Types.Devlink.RuntimeProps;
  filterDoClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
