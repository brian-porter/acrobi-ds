import * as React from "react";
import * as Types from "./types";

declare function SelectlistCtrl(props: {
  as?: React.ElementType;
  fldSelect?: Types.Visibility.VisibilityConditions;
  fbk?: Types.Visibility.VisibilityConditions;
  pHoldSrc?: React.ReactNode;
  pHoldClr?: Types.Builtin.Text;
  fldBrdClr?: Types.Builtin.Text;
  fbkFbkTxt?: Types.Visibility.VisibilityConditions;
  fbkFbkIcn?: Types.Visibility.VisibilityConditions;
  fbkFbkTxtSrc?: React.ReactNode;
  fbkFbkIcnSrc?: React.ReactNode;
  fbkFbkClr?: Types.Builtin.Text;
  fldId?: Types.Basic.IdTextInput;
  fldValue?: Types.Builtin.Text;
  onChange?: Types.Builtin.Text;
  selectMap?: Types.Devlink.Slot;
}): React.JSX.Element;
