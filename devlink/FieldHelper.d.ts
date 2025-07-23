import * as React from "react";
import * as Types from "./types";

declare function FieldHelper(props: {
  as?: React.ElementType;
  fldHelp?: Types.Visibility.VisibilityConditions;
  helpL?: Types.Visibility.VisibilityConditions;
  helpR?: Types.Visibility.VisibilityConditions;
  helpLSrc?: React.ReactNode;
  helpRSrc?: React.ReactNode;
  helpShdw?: Types.Builtin.Text;
}): React.JSX.Element;
