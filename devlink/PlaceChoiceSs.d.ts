import * as React from "react";
import * as Types from "./types";

declare function PlaceChoiceSs(props: {
  as?: React.ElementType;
  sideFade?: Types.Visibility.VisibilityConditions;
  cellMap?: Types.Devlink.Slot;
  cellExample?: Types.Visibility.VisibilityConditions;
  exampleCellActv?: Types.Visibility.VisibilityConditions;
  exampleVizSrc?: React.ReactNode;
  exampleVizSz?: Types.Builtin.Text;
  exampleVizClr?: Types.Builtin.Text;
  exampleCapt?: Types.Visibility.VisibilityConditions;
  exampleCaptTitleSrc?: React.ReactNode;
  exampleCaptSubtxtSrc?: React.ReactNode;
  exampleCaptSub2Src?: React.ReactNode;
  exampleCellSz?: Types.Builtin.Text;
  exampleCellCard?: Types.Builtin.Text;
  exampleCellClick?: Types.Devlink.RuntimeProps;
  emptyEmpty?: Types.Visibility.VisibilityConditions;
  emptyIcnSrc?: React.ReactNode;
  emptyHlineSrc?: React.ReactNode;
  emptySubTxtSrc?: React.ReactNode;
  emptyCtaTxtSrc?: React.ReactNode;
  emptyEmptyClick?: Types.Devlink.RuntimeProps;
  slotId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
