import * as React from "react";
import * as Types from "./types";

declare function FltrItm(props: {
  as?: React.ElementType;
  fltrItm?: Types.Visibility.VisibilityConditions;
  fltrTitleSrc?: React.ReactNode;
  ctrlSearch?: Types.Visibility.VisibilityConditions;
  ctrlSecHead?: Types.Visibility.VisibilityConditions;
  ctrlChoice?: Types.Visibility.VisibilityConditions;
  ctrlSlider?: Types.Visibility.VisibilityConditions;
  ctrlClr?: Types.Visibility.VisibilityConditions;
  ctrlCbox?: Types.Visibility.VisibilityConditions;
  exampleExampleFltrSwatch?: Types.Visibility.VisibilityConditions;
  ctrlClrMap?: Types.Devlink.Slot;
  exampleExampleCbox?: Types.Visibility.VisibilityConditions;
  ctrlCboxMap?: Types.Devlink.Slot;
  ctrlClearClick?: Types.Devlink.RuntimeProps;
  ctrlDoClick?: Types.Devlink.RuntimeProps;
  exampleClrSrc?: Types.Builtin.Text;
  exampleClrName?: React.ReactNode;
  exampleClrSelected?: Types.Visibility.VisibilityConditions;
  exampleCboxId?: Types.Basic.IdTextInput;
  exampleCboxLblFor?: Types.Builtin.Text;
  exampleCboxLblSrc?: React.ReactNode;
}): React.JSX.Element;
