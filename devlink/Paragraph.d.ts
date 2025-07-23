import * as React from "react";
import * as Types from "./types";

declare function Paragraph(props: {
  as?: React.ElementType;
  pgrph?: Types.Visibility.VisibilityConditions;
  bodySrc?: React.ReactNode;
  fontSz?: Types.Builtin.Text;
  fontClr?: Types.Builtin.Text;
  txtShad?: Types.Builtin.Text;
  align?: Types.Builtin.Text;
}): React.JSX.Element;
