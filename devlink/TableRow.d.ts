import * as React from "react";
import * as Types from "./types";

declare function TableRow(props: {
  as?: React.ElementType;
  col1Icn?: Types.Visibility.VisibilityConditions;
  col1TxtSrc?: React.ReactNode;
  col1IcnSrc?: React.ReactNode;
  col2?: Types.Visibility.VisibilityConditions;
  col2Icn?: Types.Visibility.VisibilityConditions;
  col2TxtSrc?: React.ReactNode;
  col2IcnSrc?: React.ReactNode;
  col1Align?: Types.Builtin.Text;
  col2Align?: Types.Builtin.Text;
  rowClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
