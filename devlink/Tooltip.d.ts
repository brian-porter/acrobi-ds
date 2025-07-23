import * as React from "react";
import * as Types from "./types";

declare function Tooltip(props: {
  as?: React.ElementType;
  txtSrc?: React.ReactNode;
  tooltip?: Types.Visibility.VisibilityConditions;
  style?: Types.Builtin.Text;
}): React.JSX.Element;
