import * as React from "react";
import * as Types from "./types";

declare function BbcNav(props: {
  as?: React.ElementType;
  nav?: Types.Visibility.VisibilityConditions;
  navItmMap?: Types.Devlink.Slot;
  exampleNav?: Types.Visibility.VisibilityConditions;
  exampleItmIcn?: Types.Visibility.VisibilityConditions;
  exampleItmTxt?: Types.Visibility.VisibilityConditions;
  exampleItmIcnSrc?: React.ReactNode;
  exampleItmTxtSrc?: React.ReactNode;
  exampleItmSz?: Types.Builtin.Text;
  exampleItmClr?: Types.Builtin.Text;
  exampleItmClick?: Types.Devlink.RuntimeProps;
  exampleActive?: Types.Builtin.Text;
  marketing?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
