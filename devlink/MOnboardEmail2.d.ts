import * as React from "react";
import * as Types from "./types";

declare function MOnboardEmail2(props: {
  as?: React.ElementType;
  signUpEmail?: Types.Visibility.VisibilityConditions;
  doBtnClick?: Types.Devlink.RuntimeProps;
  skipBtnClick?: Types.Devlink.RuntimeProps;
  emailFbk?: Types.Visibility.VisibilityConditions;
  emailFldBrdClr?: Types.Builtin.Text;
  emailFbkTxtSrc?: React.ReactNode;
  emailOnChange?: Types.Builtin.Text;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  prevClick?: Types.Devlink.RuntimeProps;
  prevBtn?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
