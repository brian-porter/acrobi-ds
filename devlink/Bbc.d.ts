import * as React from "react";
import * as Types from "./types";

declare function Bbc(props: {
  as?: React.ElementType;
  bbc?: Types.Visibility.VisibilityConditions;
  navMap?: Types.Devlink.Slot;
  exampleContent?: Types.Visibility.VisibilityConditions;
  exampleNav?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
