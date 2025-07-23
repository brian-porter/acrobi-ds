import * as React from "react";
import * as Types from "./types";

declare function OlIcon(props: {
  as?: React.ElementType;
  icn?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  icnSz?: Types.Builtin.Text;
  icnClr?: Types.Builtin.Text;
  icnDrpShdw?: Types.Builtin.Text;
  bdg?: Types.Visibility.VisibilityConditions;
  bdgTxtSrc?: React.ReactNode;
  bdgLoc?: Types.Builtin.Text;
}): React.JSX.Element;
