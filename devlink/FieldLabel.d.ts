import * as React from "react";
import * as Types from "./types";

declare function FieldLabel(props: {
  as?: React.ElementType;
  fldLblTop?: Types.Visibility.VisibilityConditions;
  lblSrc?: React.ReactNode;
  lblFor?: Types.Builtin.Text;
  lblSz?: Types.Builtin.Text;
  lblClr?: Types.Builtin.Text;
  lblShdw?: Types.Builtin.Text;
  opt?: Types.Visibility.VisibilityConditions;
  optSrc?: React.ReactNode;
  optSz?: Types.Builtin.Text;
  optClr?: Types.Builtin.Text;
}): React.JSX.Element;
