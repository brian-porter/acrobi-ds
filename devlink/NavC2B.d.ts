import * as React from "react";
import * as Types from "./types";

declare function NavC2B(props: {
  as?: React.ElementType;
  brandIcnSrc?: React.ReactNode;
  brandTxtSrc?: React.ReactNode;
  brandClick?: Types.Devlink.RuntimeProps;
  menuMap?: Types.Devlink.Slot;
  signUp?: Types.Visibility.VisibilityConditions;
  signInClick?: Types.Devlink.RuntimeProps;
  signUpClick?: Types.Devlink.RuntimeProps;
  account?: Types.Visibility.VisibilityConditions;
  accAvtrSrc?: Types.Asset.Image;
  accClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
