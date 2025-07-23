import * as React from "react";
import * as Types from "./types";

declare function NavDropMega(props: {
  as?: React.ElementType;
  navBtn?: Types.Visibility.VisibilityConditions;
  navBtnTxtSrc?: React.ReactNode;
  navBtnIcnSrc?: React.ReactNode;
  navBtnClick?: Types.Devlink.RuntimeProps;
  navItmMap?: Types.Devlink.Slot;
  navItmClick?: Types.Devlink.RuntimeProps;
  navItmTxtSrc?: React.ReactNode;
  navItmIcnSrc?: React.ReactNode;
  navItmSz?: Types.Builtin.Text;
}): React.JSX.Element;
