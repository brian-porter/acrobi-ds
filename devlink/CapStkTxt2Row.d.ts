import * as React from "react";
import * as Types from "./types";

declare function CapStkTxt2Row(props: {
  as?: React.ElementType;
  txt2Row?: Types.Visibility.VisibilityConditions;
  align?: Types.Builtin.Text;
  capPad?: Types.Builtin.Text;
  row1Src?: React.ReactNode;
  row1Sz?: Types.Builtin.Text;
  row1Clr?: Types.Builtin.Text;
  row1Lc?: Types.Builtin.Text;
  row2?: Types.Visibility.VisibilityConditions;
  row2Src?: React.ReactNode;
  row2Align?: Types.Builtin.Text;
  row2Sz?: Types.Builtin.Text;
  row2Clr?: Types.Builtin.Text;
  row2Lc?: Types.Builtin.Text;
  row3?: Types.Visibility.VisibilityConditions;
  row3Src?: React.ReactNode;
  row3Align?: Types.Builtin.Text;
  row3Sz?: Types.Builtin.Text;
  row3Clr?: Types.Builtin.Text;
  row3Lc?: Types.Builtin.Text;
}): React.JSX.Element;
