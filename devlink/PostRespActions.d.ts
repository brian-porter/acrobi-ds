import * as React from "react";
import * as Types from "./types";

declare function PostRespActions(props: {
  as?: React.ElementType;
  postRespAct?: Types.Visibility.VisibilityConditions;
  respLike?: Types.Visibility.VisibilityConditions;
  respLikeQty?: Types.Visibility.VisibilityConditions;
  respLikeQtySrc?: React.ReactNode;
  respLikeIcnSrc?: React.ReactNode;
  respLikeClick?: Types.Devlink.RuntimeProps;
  respCmnt?: Types.Visibility.VisibilityConditions;
  respCmntQty?: Types.Visibility.VisibilityConditions;
  respCommentQtySrc?: React.ReactNode;
  respCmntIcnSrc?: React.ReactNode;
  respCmntClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
