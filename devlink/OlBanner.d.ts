import * as React from "react";
import * as Types from "./types";

declare function OlBanner(props: {
  as?: React.ElementType;
  bnr?: Types.Visibility.VisibilityConditions;
  bnrIcnSrc?: React.ReactNode;
  bnrTxtSrc?: React.ReactNode;
  _2ndLabel?: Types.Visibility.VisibilityConditions;
  bnrSz?: Types.Builtin.Text;
  bnrLoc?: Types.Builtin.Text;
  bnrClr?: Types.Builtin.Text;
}): React.JSX.Element;
