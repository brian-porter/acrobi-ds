import * as React from "react";
import * as Types from "./types";

declare function ConfigOpt(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  secHead?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcn?: Types.Visibility.VisibilityConditions;
  secHeadAct1?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcnSrc?: React.ReactNode;
  secHeadTitleSrc?: React.ReactNode;
  secHeadAct1TxtSrc?: React.ReactNode;
  secHeadAct1Click?: Types.Devlink.RuntimeProps;
  conSideFade?: Types.Visibility.VisibilityConditions;
  conCellMap?: Types.Devlink.Slot;
  conSlotId?: Types.Basic.IdTextInput;
  conExampleCell?: Types.Visibility.VisibilityConditions;
  exampleNameSrc?: React.ReactNode;
  exampleCellSz?: Types.Builtin.Text;
  exampleCellStyl?: Types.Builtin.Text;
  exampleCellActv?: Types.Builtin.Text;
  exampleCellDis?: Types.Builtin.Text;
  exampleCellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
