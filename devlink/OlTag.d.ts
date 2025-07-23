import * as React from "react";
import * as Types from "./types";

declare function OlTag(props: {
  as?: React.ElementType;
  tag?: Types.Visibility.VisibilityConditions;
  tagClr?: Types.Builtin.Text;
  tagSz?: Types.Builtin.Text;
  tagLoc?: Types.Builtin.Text;
  tagTxt?: Types.Visibility.VisibilityConditions;
  tagTxtSrc?: React.ReactNode;
  tagIcn?: Types.Visibility.VisibilityConditions;
  tagIcnSrc?: React.ReactNode;
}): React.JSX.Element;
