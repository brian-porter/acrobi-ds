import * as React from "react";
import * as Types from "./types";

declare function TextfieldBtn(props: {
  as?: React.ElementType;
  fldBtn?: Types.Visibility.VisibilityConditions;
  fldBtnIcnSrc?: React.ReactNode;
  fldBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
