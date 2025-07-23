import * as React from "react";
import * as Types from "./types";

declare function SecActivity(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  secHead?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcn?: Types.Visibility.VisibilityConditions;
  secHeadAct1?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcnSrc?: React.ReactNode;
  secHeadTitleSrc?: React.ReactNode;
  secHeadAct1TxtSrc?: React.ReactNode;
  secHeadAct1Click?: Types.Devlink.RuntimeProps;
  conListMap?: Types.Devlink.Slot;
  conExampleListItm?: Types.Visibility.VisibilityConditions;
  exampleVizSrc?: Types.Asset.Image;
  exampleVizAlt?: Types.Basic.AltText;
  exampleTitleSrc?: React.ReactNode;
  exampleSubtxtSrc?: React.ReactNode;
  exampleTimeSrc?: React.ReactNode;
  exampleAct?: Types.Visibility.VisibilityConditions;
  exampleActClick?: Types.Devlink.RuntimeProps;
  exampleCellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
