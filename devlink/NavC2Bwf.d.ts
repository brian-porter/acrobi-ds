import * as React from "react";
import * as Types from "./types";

declare function NavC2Bwf(props: {
  as?: React.ElementType;
  navBtn1?: Types.Visibility.VisibilityConditions;
  navBtn1IcnSrc?: React.ReactNode;
  navBtn1TxtSrc?: React.ReactNode;
  navBtn1OnClick?: Types.Devlink.RuntimeProps;
  navMenu1Map?: Types.Devlink.Slot;
  navMenu1ItmTitleSrc?: React.ReactNode;
  navMenu1ItmIcnSrc?: React.ReactNode;
  navMenu1ItmClick?: Types.Devlink.RuntimeProps;
  signUp?: Types.Visibility.VisibilityConditions;
  signUpBtnClick?: Types.Devlink.RuntimeProps;
  signIn?: Types.Visibility.VisibilityConditions;
  signInBtnClick?: Types.Devlink.RuntimeProps;
  acct?: Types.Visibility.VisibilityConditions;
  acctAvtrSrc?: Types.Asset.Image;
  acctOnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
