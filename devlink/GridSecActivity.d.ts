import * as React from "react";
import * as Types from "./types";

declare function GridSecActivity(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  secHead?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcn?: Types.Visibility.VisibilityConditions;
  secHeadAct1?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcnSrc?: React.ReactNode;
  secHeadTitleSrc?: React.ReactNode;
  secHeadAct1TxtSrc?: React.ReactNode;
  secHeadAct1Click?: Types.Devlink.RuntimeProps;
  conCellMap?: Types.Devlink.Slot;
  conExampleCell?: Types.Visibility.VisibilityConditions;
  emptyEmpty?: Types.Visibility.VisibilityConditions;
  emptyPrimeBtnClick?: Types.Devlink.RuntimeProps;
  emptySecBtnClick?: Types.Devlink.RuntimeProps;
  emptyTirBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
