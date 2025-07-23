import * as React from "react";
import * as Types from "./types";

declare function TextfieldLinkCtrl(props: {
  as?: React.ElementType;
  fldLinkTxtSrc?: React.ReactNode;
  fldLink?: Types.Basic.Link;
  fldClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
