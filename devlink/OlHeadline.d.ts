import * as React from "react";
import * as Types from "./types";

declare function OlHeadline(props: {
  as?: React.ElementType;
  hline?: Types.Visibility.VisibilityConditions;
  hlineSubtxt?: Types.Visibility.VisibilityConditions;
  hlineTitleSrc?: React.ReactNode;
  hlineSubtxtSrc?: React.ReactNode;
  hlineLoc?: Types.Builtin.Text;
  hlineSz?: Types.Builtin.Text;
  hlineAlign?: Types.Builtin.Text;
}): React.JSX.Element;
