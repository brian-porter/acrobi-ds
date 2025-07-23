import * as React from "react";
import * as Types from "./types";

declare function Headline(props: {
  as?: React.ElementType;
  comp?: Types.Visibility.VisibilityConditions;
  subtxt?: Types.Visibility.VisibilityConditions;
  titleSrc?: React.ReactNode;
  subtxtSrc?: React.ReactNode;
  sz?: Types.Builtin.Text;
  align?: Types.Builtin.Text;
  titleH?: Types.Basic.HeadingTag;
  titleSz?: Types.Builtin.Text;
  titleClr?: Types.Builtin.Text;
  titleLh?: Types.Builtin.Text;
  titleLc?: Types.Builtin.Text;
  subtxtSz?: Types.Builtin.Text;
  subtxtClr?: Types.Builtin.Text;
  subtxtLh?: Types.Builtin.Text;
  subtxtLc?: Types.Builtin.Text;
  titleShdw?: Types.Builtin.Text;
  subTxtShdw?: Types.Builtin.Text;
  titleAlign?: Types.Builtin.Text;
  subtxtAlign?: Types.Builtin.Text;
}): React.JSX.Element;
