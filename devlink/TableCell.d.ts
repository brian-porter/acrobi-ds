import * as React from "react";
import * as Types from "./types";

declare function TableCell(props: {
  as?: React.ElementType;
  cell?: Types.Visibility.VisibilityConditions;
  icn?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  txtSrc?: React.ReactNode;
  align?: Types.Builtin.Text;
}): React.JSX.Element;
