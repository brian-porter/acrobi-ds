import * as React from "react";
import * as Types from "./types";

declare function Icon(props: {
  as?: React.ElementType;
  icn?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  icnSz?: Types.Builtin.Text;
  icnClr?: Types.Builtin.Text;
  icnDrpShdw?: Types.Builtin.Text;
}): React.JSX.Element;
