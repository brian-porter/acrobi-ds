import * as React from "react";
import * as Types from "./types";

declare function TextfieldLinkForm(props: {
  as?: React.ElementType;
  lblSrc?: React.ReactNode;
  fldLinkTxtSrc?: React.ReactNode;
  fldClick?: Types.Devlink.RuntimeProps;
  fldLink?: Types.Basic.Link;
  fldHelp?: Types.Visibility.VisibilityConditions;
  helpLSrc?: React.ReactNode;
}): React.JSX.Element;
