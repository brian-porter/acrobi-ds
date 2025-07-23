import * as React from "react";
import * as Types from "./types";

declare function MOnboardSuccess(props: {
  as?: React.ElementType;
  signUpSuccess?: Types.Visibility.VisibilityConditions;
  doBtnClick?: Types.Devlink.RuntimeProps;
  skipBtnClick?: Types.Devlink.RuntimeProps;
  prevClick?: Types.Devlink.RuntimeProps;
  prevBtn?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
