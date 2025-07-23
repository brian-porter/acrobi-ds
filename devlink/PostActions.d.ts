import * as React from "react";
import * as Types from "./types";

declare function PostActions(props: {
  as?: React.ElementType;
  postAct?: Types.Visibility.VisibilityConditions;
  like?: Types.Visibility.VisibilityConditions;
  likeQty?: Types.Visibility.VisibilityConditions;
  likeQtySrc?: React.ReactNode;
  likeIcnSrc?: React.ReactNode;
  likeClick?: Types.Devlink.RuntimeProps;
  comment?: Types.Visibility.VisibilityConditions;
  commentQty?: Types.Visibility.VisibilityConditions;
  commentQtySrc?: React.ReactNode;
  commentIcnSrc?: React.ReactNode;
  commentClick?: Types.Devlink.RuntimeProps;
  give?: Types.Visibility.VisibilityConditions;
  giveIcnSrc?: React.ReactNode;
  giveClick?: Types.Devlink.RuntimeProps;
  share?: Types.Visibility.VisibilityConditions;
  shareClick?: Types.Devlink.RuntimeProps;
  bookmark?: Types.Visibility.VisibilityConditions;
  bookmarkIcnSrc?: React.ReactNode;
  bookmarkClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
