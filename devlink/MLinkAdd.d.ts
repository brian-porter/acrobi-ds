import * as React from "react";
import * as Types from "./types";

declare function MLinkAdd(props: {
  as?: React.ElementType;
  linkAdd?: Types.Visibility.VisibilityConditions;
  headTitleSrc?: React.ReactNode;
  cancelClick?: Types.Devlink.RuntimeProps;
  txtFld?: Types.Visibility.VisibilityConditions;
  txtFldChange?: Types.Builtin.Text;
  txtFldClick?: Types.Devlink.RuntimeProps;
  linkFldChange?: Types.Builtin.Text;
  linkFldClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
