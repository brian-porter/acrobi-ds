import * as React from "react";
import * as Types from "./types";

declare function MenuLink(props: {
  as?: React.ElementType;
  menuItm?: Types.Visibility.VisibilityConditions;
  menuIcn?: Types.Visibility.VisibilityConditions;
  menuIcnSrc?: React.ReactNode;
  menuTxtSrc?: React.ReactNode;
  menuClick?: Types.Devlink.RuntimeProps;
  menuLink?: Types.Basic.Link;
}): React.JSX.Element;
