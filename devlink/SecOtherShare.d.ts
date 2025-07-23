import * as React from "react";
import * as Types from "./types";

declare function SecOtherShare(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  secHead?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcn?: Types.Visibility.VisibilityConditions;
  secHeadAct1?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcnSrc?: React.ReactNode;
  secHeadTitleSrc?: React.ReactNode;
  secHeadAct1TxtSrc?: React.ReactNode;
  secHeadAct1Click?: Types.Devlink.RuntimeProps;
  conSmsClick?: Types.Devlink.RuntimeProps;
  conEmailClick?: Types.Devlink.RuntimeProps;
  conQrClick?: Types.Devlink.RuntimeProps;
  conLinkClick?: Types.Devlink.RuntimeProps;
  conPrintClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
