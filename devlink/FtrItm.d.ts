import * as React from "react";
import * as Types from "./types";

declare function FtrItm(props: {
  as?: React.ElementType;
  icnSrc?: React.ReactNode;
  icnClr?: Types.Builtin.Text;
  lblSrc?: React.ReactNode;
  lblSz?: Types.Builtin.Text;
  lblClr?: Types.Builtin.Text;
}): React.JSX.Element;
