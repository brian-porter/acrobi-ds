import * as React from "react";
import * as Types from "./types";

declare function BtnGrpItm(props: {
  as?: React.ElementType;
  btn?: Types.Visibility.VisibilityConditions;
  btnTxt?: Types.Visibility.VisibilityConditions;
  btnIcn?: Types.Visibility.VisibilityConditions;
  btnTxtSrc?: React.ReactNode;
  btnIcnSrc?: React.ReactNode;
  btnIcnLoc?: Types.Builtin.Text;
  btnLoc?: Types.Builtin.Text;
  btnLink?: Types.Basic.Link;
  btnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
