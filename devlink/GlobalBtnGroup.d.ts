import * as React from "react";
import * as Types from "./types";

declare function GlobalBtnGroup(props: {
  as?: React.ElementType;
  groupVisibility?: Types.Visibility.VisibilityConditions;
  classes?: Types.Builtin.Text;
  slot?: Types.Slots.SlotContent;
}): React.JSX.Element;
