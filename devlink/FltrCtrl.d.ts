import * as React from "react";
import * as Types from "./types";

declare function FltrCtrl(props: {
  as?: React.ElementType;
  search?: Types.Visibility.VisibilityConditions;
  secHead?: Types.Visibility.VisibilityConditions;
  choice?: Types.Visibility.VisibilityConditions;
  slider?: Types.Visibility.VisibilityConditions;
  clr?: Types.Visibility.VisibilityConditions;
  cbox?: Types.Visibility.VisibilityConditions;
  clrExampleFltrSwatch?: Types.Visibility.VisibilityConditions;
  clrClrMap?: Types.Devlink.Slot;
  exampleFltrSwatchClrSrc?: Types.Builtin.Text;
  exampleFltrSwatchClrName?: React.ReactNode;
  exampleFltrSwatchClrSelected?: Types.Visibility.VisibilityConditions;
  cboxExampleCbox?: Types.Visibility.VisibilityConditions;
  cboxCboxMap?: Types.Devlink.Slot;
  exampleCboxCboxId?: Types.Basic.IdTextInput;
  exampleCboxCboxLblFor?: Types.Builtin.Text;
  exampleCboxCboxLblSrc?: React.ReactNode;
  clearClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
  headFldTBtn?: Types.Visibility.VisibilityConditions;
  headFldPholdSrc?: Types.Builtin.Text;
  headFldTBtnClick?: Types.Devlink.RuntimeProps;
  headFldClick?: Types.Devlink.RuntimeProps;
  headTitleSrc?: React.ReactNode;
}): React.JSX.Element;
