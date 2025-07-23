import * as React from "react";
import * as Types from "./types";

declare function Message(props: {
  as?: React.ElementType;
  lbl?: Types.Visibility.VisibilityConditions;
  titleSrc?: React.ReactNode;
  icn?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  icnSz?: Types.Builtin.Text;
  icnClr?: Types.Builtin.Text;
  bodySrc?: React.ReactNode;
  bodySz?: Types.Builtin.Text;
  bodyClr?: Types.Builtin.Text;
}): React.JSX.Element;
