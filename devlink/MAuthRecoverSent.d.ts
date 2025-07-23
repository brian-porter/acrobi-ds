import * as React from "react";
import * as Types from "./types";

declare function MAuthRecoverSent(props: {
  as?: React.ElementType;
  recoverSent?: Types.Visibility.VisibilityConditions;
  openAppBtnClick?: Types.Devlink.RuntimeProps;
  resendTxtClr?: Types.Builtin.Text;
  resendBtnClick?: Types.Devlink.RuntimeProps;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  resendTxtSrc?: React.ReactNode;
}): React.JSX.Element;
