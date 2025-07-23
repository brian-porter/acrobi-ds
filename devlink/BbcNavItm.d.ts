import * as React from "react";
import * as Types from "./types";

declare function BbcNavItm(props: {
  as?: React.ElementType;
  itm?: Types.Visibility.VisibilityConditions;
  itmIcn?: Types.Visibility.VisibilityConditions;
  itmTxt?: Types.Visibility.VisibilityConditions;
  itmIcnSrc?: React.ReactNode;
  itmTxtSrc?: React.ReactNode;
  itmSz?: Types.Builtin.Text;
  itmClr?: Types.Builtin.Text;
  itmClick?: Types.Devlink.RuntimeProps;
  active?: Types.Builtin.Text;
  itmLink?: Types.Visibility.VisibilityConditions;
  itmLinkSrc?: Types.Basic.Link;
}): React.JSX.Element;
