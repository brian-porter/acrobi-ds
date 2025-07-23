import * as React from "react";
import * as Types from "./types";

declare function Chiclet(props: {
  as?: React.ElementType;
  chiclet?: Types.Visibility.VisibilityConditions;
  lbl?: Types.Visibility.VisibilityConditions;
  chicId?: Types.Basic.IdTextInput;
  chicMulti?: Types.Builtin.Text;
  chicStyl?: Types.Builtin.Text;
  chicSz?: Types.Builtin.Text;
  lblIcn?: Types.Visibility.VisibilityConditions;
  lblTxt?: Types.Visibility.VisibilityConditions;
  lblIcnSrc?: React.ReactNode;
  lblTxtSrc?: React.ReactNode;
  lblSz?: Types.Builtin.Text;
  lblClr?: Types.Builtin.Text;
  chicClick?: Types.Devlink.RuntimeProps;
  link?: Types.Basic.Link;
}): React.JSX.Element;
