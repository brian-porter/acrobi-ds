import * as React from "react";
import * as Types from "./types";

declare function SecVideo(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  secHead?: Types.Visibility.VisibilityConditions;
  stats?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcn?: Types.Visibility.VisibilityConditions;
  secHeadAct1?: Types.Visibility.VisibilityConditions;
  secHeadAct1Icn?: Types.Visibility.VisibilityConditions;
  secHeadAct1Txt?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcnSrc?: React.ReactNode;
  secHeadTitleSrc?: React.ReactNode;
  secHeadAct1IcnSrc?: React.ReactNode;
  secHeadAct1TxtSrc?: React.ReactNode;
  secHeadAct1Click?: Types.Devlink.RuntimeProps;
  conSideFade?: Types.Visibility.VisibilityConditions;
  conCellMap?: Types.Devlink.Slot;
  conExampleCell?: Types.Visibility.VisibilityConditions;
  stat1Src?: React.ReactNode;
  stat2Src?: React.ReactNode;
  stat3Src?: React.ReactNode;
  stat4Src?: React.ReactNode;
  stat2?: Types.Visibility.VisibilityConditions;
  stat3?: Types.Visibility.VisibilityConditions;
  stat4?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
