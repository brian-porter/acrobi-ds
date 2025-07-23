import * as React from "react";
import * as Types from "./types";

declare function MOnboardPhone(props: {
  as?: React.ElementType;
  signUpPhone?: Types.Visibility.VisibilityConditions;
  doBtnClick?: Types.Devlink.RuntimeProps;
  skipBtnClick?: Types.Devlink.RuntimeProps;
  telFbk?: Types.Visibility.VisibilityConditions;
  telFldBrdClr?: Types.Builtin.Text;
  telFbkTxtSrc?: React.ReactNode;
  telOnChange?: Types.Builtin.Text;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  prevClick?: Types.Devlink.RuntimeProps;
  prevBtn?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
