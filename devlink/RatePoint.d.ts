import * as React from "react";
import * as Types from "./types";

declare function RatePoint(props: {
  as?: React.ElementType;
  full?: Types.Visibility.VisibilityConditions;
  half?: Types.Visibility.VisibilityConditions;
  pointClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
