import * as React from "react";
import * as Types from "./types";

declare function GroupsGrid(props: {
  as?: React.ElementType;
  groupMap?: Types.Devlink.Slot;
  exampleGroup?: Types.Visibility.VisibilityConditions;
  slotId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
