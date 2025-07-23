import * as React from "react";
import * as Types from "./types";

declare function Button(props: {
  as?: React.ElementType;
  btn?: Types.Visibility.VisibilityConditions;
  btnIcn?: Types.Visibility.VisibilityConditions;
  btnTxt?: Types.Visibility.VisibilityConditions;
  btnTxtSrc?: React.ReactNode;
  btnIcnSrc?: React.ReactNode;
  btnSz?: Types.Builtin.Text;
  btnStyl?: Types.Builtin.Text;
  btnIcnLoc?: Types.Builtin.Text;
  lblSz?: Types.Builtin.Text;
  lblClr?: Types.Builtin.Text;
  lblGap?: Types.Builtin.Text;
  lblLc?: Types.Builtin.Text;
  lblShad?: Types.Builtin.Text;
  btnHug?: Types.Builtin.Text;
  btnShdw?: Types.Builtin.Text;
  target?: Types.Builtin.Text;
  btnId?: Types.Builtin.Text;
  disabled?: Types.Builtin.Text;
  btnActive?: Types.Builtin.Text;
  btnClick?: Types.Devlink.RuntimeProps;
  btnLink?: Types.Basic.Link;
}): React.JSX.Element;
