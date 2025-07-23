import * as React from "react";
import * as Types from "./types";

declare function List(props: {
  as?: React.ElementType;
  list?: Types.Visibility.VisibilityConditions;
  listItmMap?: Types.Devlink.Slot;
  exampleListItm?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
