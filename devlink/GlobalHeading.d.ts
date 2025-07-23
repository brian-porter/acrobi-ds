import * as React from "react";
import * as Types from "./types";

declare function GlobalHeading(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: Types.Basic.RichTextChildren;
  classes?: Types.Builtin.Text;
}): React.JSX.Element;
