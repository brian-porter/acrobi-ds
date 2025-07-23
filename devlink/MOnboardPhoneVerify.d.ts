import * as React from "react";
import * as Types from "./types";

declare function MOnboardPhoneVerify(props: {
  as?: React.ElementType;
  signUpPhoneVerify?: Types.Visibility.VisibilityConditions;
  resendTxtClr?: Types.Builtin.Text;
  codeFbk?: Types.Visibility.VisibilityConditions;
  codeFldBrdClr?: Types.Builtin.Text;
  codeFbkTxtSrc?: React.ReactNode;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  doBtnClick?: Types.Devlink.RuntimeProps;
  resendClick?: Types.Devlink.RuntimeProps;
  resendTxtSrc?: React.ReactNode;
  prevClick?: Types.Devlink.RuntimeProps;
  prevBtn?: Types.Visibility.VisibilityConditions;
  codeOnChange?: Types.Builtin.Text;
}): React.JSX.Element;
