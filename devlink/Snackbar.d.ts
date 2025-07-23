import * as React from "react";
import * as Types from "./types";

declare function Snackbar(props: {
  as?: React.ElementType;
  sb?: Types.Visibility.VisibilityConditions;
  sbIcn?: Types.Visibility.VisibilityConditions;
  sbBtn?: Types.Visibility.VisibilityConditions;
  sbStyle?: Types.Builtin.Text;
  sbIcnSrc?: React.ReactNode;
  sbTxtSrc?: React.ReactNode;
  sbBtnTxtSrc?: React.ReactNode;
  sbBtnLink?: Types.Basic.Link;
  sbBtnClick?: Types.Devlink.RuntimeProps;
  sbLoc?: Types.Builtin.Text;
}): React.JSX.Element;
