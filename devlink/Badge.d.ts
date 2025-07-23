import * as React from "react";
import * as Types from "./types";

declare function Badge(props: {
  as?: React.ElementType;
  bdg?: Types.Visibility.VisibilityConditions;
  bdgClr?: Types.Builtin.Text;
  bdgSz?: Types.Builtin.Text;
  bdgCont?: Types.Visibility.VisibilityConditions;
  bdgTxt?: Types.Visibility.VisibilityConditions;
  bdgTxtSrc?: React.ReactNode;
  bdgIcn?: Types.Visibility.VisibilityConditions;
  bdgIcnSrc?: React.ReactNode;
  bdgId?: Types.Basic.IdTextInput;
  bdgIcnSz?: Types.Builtin.Text;
  bdgLoc?: Types.Builtin.Text;
}): React.JSX.Element;
