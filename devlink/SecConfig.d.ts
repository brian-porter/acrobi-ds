import * as React from "react";
import * as Types from "./types";

declare function SecConfig(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  confMap?: Types.Devlink.Slot;
  slotId?: Types.Basic.IdTextInput;
  exampleOption?: Types.Visibility.VisibilityConditions;
  exampleOptSecHead?: Types.Visibility.VisibilityConditions;
  exampleOptHeadTitleSrc?: React.ReactNode;
  exampleOptSideFade?: Types.Visibility.VisibilityConditions;
  exampleOptCellMap?: Types.Devlink.Slot;
  exampleOptExampleCell?: Types.Visibility.VisibilityConditions;
  exampleOptCellNameSrc?: React.ReactNode;
  exampleOptCellActv?: Types.Builtin.Text;
  exampleOptCellDis?: Types.Builtin.Text;
  exampleOptCellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
