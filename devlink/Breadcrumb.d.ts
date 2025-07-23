import * as React from "react";
import * as Types from "./types";

declare function Breadcrumb(props: {
  as?: React.ElementType;
  breadcrumb?: Types.Visibility.VisibilityConditions;
  homeClick?: Types.Devlink.RuntimeProps;
  itmMap?: Types.Devlink.Slot;
  itmClr?: Types.Builtin.Text;
  itmSz?: Types.Builtin.Text;
}): React.JSX.Element;
