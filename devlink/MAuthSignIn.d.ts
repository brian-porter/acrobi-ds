import * as React from "react";
import * as Types from "./types";

declare function MAuthSignIn(props: {
  as?: React.ElementType;
  signIn?: Types.Visibility.VisibilityConditions;
  emailOnChange?: Types.Builtin.Text;
  passOnChange?: Types.Builtin.Text;
  passFldType?: Types.Builtin.Text;
  passFldBtnIcnSrc?: React.ReactNode;
  passFldBtnClick?: Types.Devlink.RuntimeProps;
  signInBtnDisabled?: Types.Builtin.Text;
  signInBtnClick?: Types.Devlink.RuntimeProps;
  helpBtnClick?: Types.Devlink.RuntimeProps;
  signUpBtnClick?: Types.Devlink.RuntimeProps;
  emailFbk?: Types.Visibility.VisibilityConditions;
  emailFbkTxtSrc?: React.ReactNode;
  emailFldBrdClr?: Types.Builtin.Text;
  passFbk?: Types.Visibility.VisibilityConditions;
  passFldBrdClr?: Types.Builtin.Text;
  passFbkTxtSrc?: React.ReactNode;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
}): React.JSX.Element;
