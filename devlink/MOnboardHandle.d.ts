import * as React from "react";
import * as Types from "./types";

declare function MOnboardHandle(props: {
  as?: React.ElementType;
  signUpHandle?: Types.Visibility.VisibilityConditions;
  doBtnClick?: Types.Devlink.RuntimeProps;
  handleFbk?: Types.Visibility.VisibilityConditions;
  handleFldBrdClr?: Types.Builtin.Text;
  handleFbkTxtSrc?: React.ReactNode;
  handleFbkIcnSrc?: React.ReactNode;
  handleFbkClr?: Types.Builtin.Text;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  prevClick?: Types.Devlink.RuntimeProps;
  handleOnChange?: Types.Builtin.Text;
  prevBtn?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
