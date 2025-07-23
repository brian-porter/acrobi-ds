import * as React from "react";
import * as Types from "./types";

declare function PostRespItem(props: {
  as?: React.ElementType;
  respItm?: Types.Visibility.VisibilityConditions;
  body?: React.ReactNode;
  atrbAvtr?: Types.Asset.Image;
  atrbAvtrAlt?: Types.Basic.AltText;
  atrbName?: React.ReactNode;
  atrbBdg?: Types.Visibility.VisibilityConditions;
  atrbRank?: React.ReactNode;
  atrbClick?: Types.Devlink.RuntimeProps;
  atrbTime?: React.ReactNode;
  respAct?: Types.Visibility.VisibilityConditions;
  respLike?: Types.Visibility.VisibilityConditions;
  respLikeQty?: Types.Visibility.VisibilityConditions;
  respLikeQtySrc?: React.ReactNode;
  respLikeIcnSrc?: React.ReactNode;
  respLikeClick?: Types.Devlink.RuntimeProps;
  respComment?: Types.Visibility.VisibilityConditions;
  respCmntQty?: Types.Visibility.VisibilityConditions;
  respCmntQtySrc?: React.ReactNode;
  respCmntIcnSrc?: React.ReactNode;
  respCmntClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
