import * as React from "react";
import * as Types from "./types";

declare function RdioItm2(props: {
  as?: React.ElementType;
  lbl?: Types.Visibility.VisibilityConditions;
  fbk?: Types.Visibility.VisibilityConditions;
  name?: Types.Builtin.Text;
  id?: Types.Basic.IdTextInput;
  value?: Types.Builtin.Text;
  lblSrc?: React.ReactNode;
  lblSz?: Types.Builtin.Text;
  rdioAlign?: Types.Builtin.Text;
  tabOrder?: Types.Builtin.Text;
  fbkFbkTxt?: Types.Visibility.VisibilityConditions;
  fbkFbkIcn?: Types.Visibility.VisibilityConditions;
  fbkFbkTxtSrc?: React.ReactNode;
  fbkFbkIcnSrc?: React.ReactNode;
  fbkFbkLblClr?: Types.Builtin.Text;
}): React.JSX.Element;
