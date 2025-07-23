import * as React from "react";
import * as Types from "./types";

declare function MenuItem(props: {
  as?: React.ElementType;
  menuItm?: Types.Visibility.VisibilityConditions;
  lIcn?: Types.Visibility.VisibilityConditions;
  pSubtext?: Types.Visibility.VisibilityConditions;
  tValue?: Types.Visibility.VisibilityConditions;
  tAcrdArrw?: Types.Visibility.VisibilityConditions;
  tSelected?: Types.Visibility.VisibilityConditions;
  lIcnSrc?: React.ReactNode;
  lIcnClr?: Types.Builtin.Text;
  pTitleSrc?: React.ReactNode;
  pTitleSz?: Types.Builtin.Text;
  pSubtxtSrc?: React.ReactNode;
  tValueSrc?: React.ReactNode;
  lItmDiv?: Types.Builtin.Text;
  pItmDiv?: Types.Builtin.Text;
  tItmDiv?: Types.Builtin.Text;
  menuItmLink?: Types.Basic.Link;
  menuItmClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
