import * as React from "react";
import * as Types from "./types";

declare function RdoCtrl(props: {
  as?: React.ElementType;
  fbk?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  itmName?: Types.Builtin.Text;
  itmValue?: Types.Builtin.Text;
  itmLblSrc?: React.ReactNode;
  itmLblSz?: Types.Builtin.Text;
  align?: Types.Builtin.Text;
  tabOrder?: Types.Builtin.Text;
  fbkFbkTxt?: Types.Visibility.VisibilityConditions;
  fbkFbkIcn?: Types.Visibility.VisibilityConditions;
  fbkFbkTxtSrc?: React.ReactNode;
  fbkFbkIcnSrc?: React.ReactNode;
  fbkFbkClr?: Types.Builtin.Text;
  fbkFbkIcnLoc?: Types.Builtin.Text;
  onChange?: Types.Builtin.Text;
  itmClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
