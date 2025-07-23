import * as React from "react";
import * as Types from "./types";

declare function Selectlist2Ctrl(props: {
  as?: React.ElementType;
  select?: Types.Visibility.VisibilityConditions;
  fbk?: Types.Visibility.VisibilityConditions;
  selectValue?: Types.Devlink.RuntimeProps;
  selectTitleSrc?: React.ReactNode;
  selectTitleClr?: Types.Builtin.Text;
  selectBrdClr?: Types.Builtin.Text;
  selectMap?: Types.Devlink.Slot;
  fbkFbkTxt?: Types.Visibility.VisibilityConditions;
  fbkFbkIcn?: Types.Visibility.VisibilityConditions;
  fbkFbkTxtSrc?: React.ReactNode;
  fbkFbkIcnSrc?: React.ReactNode;
  fbkFbkClr?: Types.Builtin.Text;
}): React.JSX.Element;
