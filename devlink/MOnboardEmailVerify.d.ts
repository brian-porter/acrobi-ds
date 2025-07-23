import * as React from "react";
import * as Types from "./types";

declare function MOnboardEmailVerify(props: {
  as?: React.ElementType;
  signUpEmailVerify?: Types.Visibility.VisibilityConditions;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  titleSrc?: React.ReactNode;
  subtxtSrc?: React.ReactNode;
  bodySrc?: React.ReactNode;
  prevBtn?: Types.Visibility.VisibilityConditions;
  prevClick?: Types.Devlink.RuntimeProps;
  appBtn?: Types.Visibility.VisibilityConditions;
  appBtnClick?: Types.Devlink.RuntimeProps;
  nextBtn?: Types.Visibility.VisibilityConditions;
  nextBtnStyl?: Types.Builtin.Text;
  nextBtnDisabled?: Types.Builtin.Text;
  nextBtnClick?: Types.Devlink.RuntimeProps;
  resend?: Types.Visibility.VisibilityConditions;
  resendTxtSrc?: React.ReactNode;
  resendTxtClr?: Types.Builtin.Text;
  resendClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
