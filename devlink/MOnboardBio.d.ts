import * as React from "react";
import * as Types from "./types";

declare function MOnboardBio(props: {
  as?: React.ElementType;
  doBtnClick?: Types.Devlink.RuntimeProps;
  skipBtnClick?: Types.Devlink.RuntimeProps;
  signUpBio?: Types.Visibility.VisibilityConditions;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  prevClick?: Types.Devlink.RuntimeProps;
  prevBtn?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
