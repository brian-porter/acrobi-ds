import * as React from "react";
import * as Types from "./types";

declare function CapStkLR(props: {
  as?: React.ElementType;
  lR?: Types.Visibility.VisibilityConditions;
  lTxtSrc?: React.ReactNode;
  rTxtSrc?: React.ReactNode;
  capPad?: Types.Builtin.Text;
  lTxtClr?: Types.Builtin.Text;
  lTxtSz?: Types.Builtin.Text;
  rTxtClr?: Types.Builtin.Text;
  rTxtSz?: Types.Builtin.Text;
}): React.JSX.Element;
