import * as React from "react";
import * as Types from "./types";

declare function SecBillboardGrid(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  cellMap?: Types.Devlink.Slot;
  exampleProdFeat?: Types.Visibility.VisibilityConditions;
  cellBgClr?: Types.Builtin.Text;
  gridCol?: Types.Builtin.Text;
  gridGap?: Types.Builtin.Text;
  gridPad?: Types.Builtin.Text;
}): React.JSX.Element;
