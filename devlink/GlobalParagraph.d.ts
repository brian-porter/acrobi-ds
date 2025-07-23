import * as React from "react";
import * as Types from "./types";

declare function GlobalParagraph(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: Types.Basic.RichTextChildren;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
