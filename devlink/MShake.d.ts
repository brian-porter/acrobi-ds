import * as React from "react";
import * as Types from "./types";

declare function MShake(props: {
  as?: React.ElementType;
  shake?: Types.Visibility.VisibilityConditions;
  shakeAllow?: Types.Visibility.VisibilityConditions;
  shakeAllowCancelClick?: Types.Devlink.RuntimeProps;
  shakeAllowClick?: Types.Devlink.RuntimeProps;
  shakeReady?: Types.Visibility.VisibilityConditions;
  shakeReadyCancelClick?: Types.Devlink.RuntimeProps;
  shakeReadyAddClick?: Types.Devlink.RuntimeProps;
  shakeReadyFindClick?: Types.Devlink.RuntimeProps;
  shaking?: Types.Visibility.VisibilityConditions;
  shakingCancelClick?: Types.Devlink.RuntimeProps;
  shakingClick?: Types.Devlink.RuntimeProps;
  shakeResult?: Types.Visibility.VisibilityConditions;
  shakeResultCancelClick?: Types.Devlink.RuntimeProps;
  shakeResultRedoClick?: Types.Devlink.RuntimeProps;
  groupMap?: Types.Devlink.Slot;
}): React.JSX.Element;
