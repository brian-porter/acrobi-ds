import * as React from "react";
import * as Types from "./types";

declare function RdoGrpCtrl(props: {
  as?: React.ElementType;
  fieldRdoCtrlMap?: Types.Devlink.Slot;
  fieldExampleRdoCtrl?: Types.Visibility.VisibilityConditions;
  fieldItmTxtSrc?: React.ReactNode;
  fieldItmName?: Types.Builtin.Text;
  fieldItmValue?: Types.Builtin.Text;
  fieldAlign?: Types.Builtin.Text;
  fieldItmClick?: Types.Devlink.RuntimeProps;
  fieldFbk?: Types.Visibility.VisibilityConditions;
  fieldFbkTxtSrc?: React.ReactNode;
  fieldFbkIcnSrc?: React.ReactNode;
  fieldFbkClr?: Types.Builtin.Text;
  fieldFbkIcnLoc?: Types.Builtin.Text;
}): React.JSX.Element;
