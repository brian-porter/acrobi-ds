import * as React from "react";
import * as Types from "./types";

declare function AdaptIcon(props: {
  as?: React.ElementType;
  adpt?: Types.Visibility.VisibilityConditions;
  bdg?: Types.Visibility.VisibilityConditions;
  tag?: Types.Visibility.VisibilityConditions;
  adptSz?: Types.Builtin.Text;
  adptShape?: Types.Builtin.Text;
  adptBgClr?: Types.Builtin.Text;
  icnClr?: Types.Builtin.Text;
  icnSrc?: React.ReactNode;
  bdgTxtSrc?: React.ReactNode;
  bdgLoc?: Types.Builtin.Text;
  tagTxtSrc?: React.ReactNode;
  adptGroup?: Types.Builtin.Text;
}): React.JSX.Element;
