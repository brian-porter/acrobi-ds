import * as React from "react";
import * as Types from "./types";

declare function OlBtn(props: {
  as?: React.ElementType;
  btn?: Types.Visibility.VisibilityConditions;
  btnIcn?: Types.Visibility.VisibilityConditions;
  btnTxt?: Types.Visibility.VisibilityConditions;
  btnIcnSrc?: React.ReactNode;
  btnTxtSrc?: React.ReactNode;
  btnSz?: Types.Builtin.Text;
  btnStyl?: Types.Builtin.Text;
  btnLoc?: Types.Builtin.Text;
  btnLink?: Types.Basic.Link;
  btnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
