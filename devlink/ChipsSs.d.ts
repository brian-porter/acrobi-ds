import * as React from "react";
import * as Types from "./types";

declare function ChipsSs(props: {
  as?: React.ElementType;
  sideFade?: Types.Visibility.VisibilityConditions;
  cellMap?: Types.Devlink.Slot;
  exampleCells?: Types.Visibility.VisibilityConditions;
  chipBase?: Types.Visibility.VisibilityConditions;
  chipAvtr?: Types.Visibility.VisibilityConditions;
  chipChipIcnSrc?: React.ReactNode;
}): React.JSX.Element;
