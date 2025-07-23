import * as React from "react";
import * as Types from "./types";

declare function SecPaginate(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  conBtnLblSz?: Types.Builtin.Text;
  conBtnLblClr?: Types.Builtin.Text;
  conItmMap?: Types.Devlink.Slot;
  conExample?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
