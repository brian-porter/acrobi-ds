import * as React from "react";
import * as Types from "./types";

declare function FltrSwatch(props: {
  as?: React.ElementType;
  comp?: Types.Visibility.VisibilityConditions;
  clrSrc?: Types.Builtin.Text;
  clrName?: React.ReactNode;
  selected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
