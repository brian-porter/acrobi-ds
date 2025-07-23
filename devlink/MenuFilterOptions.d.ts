import * as React from "react";
import * as Types from "./types";

declare function MenuFilterOptions(props: {
  as?: React.ElementType;
  more?: Types.Visibility.VisibilityConditions;
  clr?: Types.Visibility.VisibilityConditions;
  clrItmMap?: Types.Devlink.Slot;
}): React.JSX.Element;
