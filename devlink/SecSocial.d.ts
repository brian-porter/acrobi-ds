import * as React from "react";
import * as Types from "./types";

declare function SecSocial(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcn?: Types.Visibility.VisibilityConditions;
  secHeadAct1?: Types.Visibility.VisibilityConditions;
  secHeadTitleIcnSrc?: React.ReactNode;
  secHeadTitleSrc?: React.ReactNode;
  secHeadAct1TxtSrc?: React.ReactNode;
  conSideFade?: Types.Visibility.VisibilityConditions;
  conSocialEmpty?: Types.Visibility.VisibilityConditions;
  conMetaClick?: Types.Devlink.RuntimeProps;
  conInstaClick?: Types.Devlink.RuntimeProps;
  conTwitterClick?: Types.Devlink.RuntimeProps;
  conPinterestClick?: Types.Devlink.RuntimeProps;
  conSnapClick?: Types.Devlink.RuntimeProps;
  conSocialAddClick?: Types.Devlink.RuntimeProps;
  conSocialEmptyClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
