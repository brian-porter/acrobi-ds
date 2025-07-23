import * as React from "react";
import * as Types from "./types";

declare function MOnboardConnect(props: {
  as?: React.ElementType;
  phoneContBtnClick?: Types.Devlink.RuntimeProps;
  metaBtnClick?: Types.Devlink.RuntimeProps;
  signUpContacts?: Types.Visibility.VisibilityConditions;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  prevClick?: Types.Devlink.RuntimeProps;
  phoneContBtn?: Types.Visibility.VisibilityConditions;
  metaBtn?: Types.Visibility.VisibilityConditions;
  googleBtn?: Types.Visibility.VisibilityConditions;
  googleBtnClick?: Types.Devlink.RuntimeProps;
  facebookBtnStyl?: Types.Builtin.Text;
  googleBtnStyl?: Types.Builtin.Text;
  prevBtn?: Types.Visibility.VisibilityConditions;
  laterBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
