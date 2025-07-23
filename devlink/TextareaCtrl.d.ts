import * as React from "react";
import * as Types from "./types";

declare function TextareaCtrl(props: {
  as?: React.ElementType;
  fbk?: Types.Visibility.VisibilityConditions;
  fldId?: Types.Basic.IdTextInput;
  fldName?: Types.Builtin.Text;
  fldPholdSrc?: Types.Builtin.Text;
  fldBrdClr?: Types.Builtin.Text;
  fldHeight?: Types.Builtin.Text;
  fbkFbkIcn?: Types.Visibility.VisibilityConditions;
  fbkFbkTxt?: Types.Visibility.VisibilityConditions;
  fbkFbkTxtSrc?: React.ReactNode;
  fbkFbkIcnSrc?: React.ReactNode;
  fbkFbkClr?: Types.Builtin.Text;
  tabOrder?: Types.Builtin.Text;
  onChange?: Types.Builtin.Text;
  fldClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
