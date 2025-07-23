import * as React from "react";
import * as Types from "./types";

declare function MOnboardFr(props: {
  as?: React.ElementType;
  signUpFr?: Types.Visibility.VisibilityConditions;
  metaBtn?: Types.Visibility.VisibilityConditions;
  googleBtn?: Types.Visibility.VisibilityConditions;
  metaBtnClick?: Types.Devlink.RuntimeProps;
  googleBtnClick?: Types.Devlink.RuntimeProps;
  bqBtnClick?: Types.Devlink.RuntimeProps;
  signInClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
