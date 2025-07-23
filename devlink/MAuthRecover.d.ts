import * as React from "react";
import * as Types from "./types";

declare function MAuthRecover(props: {
  as?: React.ElementType;
  recover?: Types.Visibility.VisibilityConditions;
  emailOnChange?: Types.Builtin.Text;
  emailFbk?: Types.Visibility.VisibilityConditions;
  emailFldBrdClr?: Types.Builtin.Text;
  emailFbkTxtSrc?: React.ReactNode;
  findBtnClick?: Types.Devlink.RuntimeProps;
  backBtnClick?: Types.Devlink.RuntimeProps;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
}): React.JSX.Element;
