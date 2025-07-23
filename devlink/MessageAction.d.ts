import * as React from "react";
import * as Types from "./types";

declare function MessageAction(props: {
  as?: React.ElementType;
  msg?: Types.Visibility.VisibilityConditions;
  msgTxtSrc?: React.ReactNode;
  actTxtSrc?: React.ReactNode;
  txtClr?: Types.Builtin.Text;
  txtShad?: Types.Builtin.Text;
  ctaTxtShad?: Types.Builtin.Text;
  msgId?: Types.Builtin.Text;
  msgClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
