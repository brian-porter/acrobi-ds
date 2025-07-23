import * as React from "react";
import * as Types from "./types";

declare function Label(props: {
  as?: React.ElementType;
  lbl?: Types.Visibility.VisibilityConditions;
  txt?: Types.Visibility.VisibilityConditions;
  icn?: Types.Visibility.VisibilityConditions;
  txtSrc?: React.ReactNode;
  icnSrc?: React.ReactNode;
  icnLoc?: Types.Builtin.Text;
  lblSz?: Types.Builtin.Text;
  lblClr?: Types.Builtin.Text;
  lblShad?: Types.Builtin.Text;
  lblGap?: Types.Builtin.Text;
  lblLc?: Types.Builtin.Text;
  id?: Types.Basic.IdTextInput;
  lblFor?: Types.Builtin.Text;
  icnClr?: Types.Builtin.Text;
  anchor?: Types.Builtin.Text;
}): React.JSX.Element;
