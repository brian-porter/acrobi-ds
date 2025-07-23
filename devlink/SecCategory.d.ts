import * as React from "react";
import * as Types from "./types";

declare function SecCategory(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  secHead?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcn?: Types.Visibility.VisibilityConditions;
  conSideFade?: Types.Visibility.VisibilityConditions;
  conCellMap?: Types.Devlink.Slot;
  exampleVizSrc?: Types.Asset.Image;
  exampleVizAlt?: Types.Basic.AltText;
  exampleVizAsp?: Types.Builtin.Text;
  exampleNameSrc?: React.ReactNode;
  exampleCellClick?: Types.Devlink.RuntimeProps;
  secHeadAct1?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcnSrc?: React.ReactNode;
  secHeadTitleSrc?: React.ReactNode;
  secHeadTitleSz?: Types.Builtin.Text;
  secHeadTitleClr?: Types.Builtin.Text;
  secHeadAct1TxtSrc?: React.ReactNode;
  secHeadAct1Click?: Types.Devlink.RuntimeProps;
  conCellExample?: Types.Visibility.VisibilityConditions;
  conEmpty?: Types.Visibility.VisibilityConditions;
  exampleVizSz?: Types.Builtin.Text;
}): React.JSX.Element;
