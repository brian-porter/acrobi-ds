import * as React from "react";
import * as Types from "./types";

declare function P2Grid(props: {
  as?: React.ElementType;
  p2Grid?: Types.Visibility.VisibilityConditions;
  slotId?: Types.Basic.IdTextInput;
  p2Map?: Types.Devlink.Slot;
  exampleP2Object?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
