import * as React from "react";
import * as Types from "./types";

declare function GutterBadge(props: {
  as?: React.ElementType;
  gttrBdg?: Types.Visibility.VisibilityConditions;
  pin?: Types.Visibility.VisibilityConditions;
  alarm?: Types.Visibility.VisibilityConditions;
  bookmark?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
