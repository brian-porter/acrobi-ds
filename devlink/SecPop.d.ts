import * as React from "react";
import * as Types from "./types";

declare function SecPop(props: {
  as?: React.ElementType;
  popMap?: Types.Devlink.Slot;
  popExample?: Types.Visibility.VisibilityConditions;
  pop?: Types.Visibility.VisibilityConditions;
  slotId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
