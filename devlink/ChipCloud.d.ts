import * as React from "react";
import * as Types from "./types";

declare function ChipCloud(props: {
  as?: React.ElementType;
  chipCloud?: Types.Visibility.VisibilityConditions;
  slotIdChip?: Types.Basic.IdTextInput;
  chipMap?: Types.Devlink.Slot;
  exampleChip?: Types.Visibility.VisibilityConditions;
  chipTxtSrc?: React.ReactNode;
  chipClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
