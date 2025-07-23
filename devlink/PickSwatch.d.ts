import * as React from "react";
import * as Types from "./types";

declare function PickSwatch(props: {
  as?: React.ElementType;
  swatchActive?: Types.Visibility.VisibilityConditions;
  swatchClr?: Types.Builtin.Text;
  swatchClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
