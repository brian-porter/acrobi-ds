import * as React from "react";
import * as Types from "./types";

declare function ClrItm(props: {
  as?: React.ElementType;
  itmOn?: Types.Visibility.VisibilityConditions;
  swatchClr?: Types.Builtin.Text;
  itmTitleSrc?: React.ReactNode;
  itmClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
