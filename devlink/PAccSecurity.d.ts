import * as React from "react";
import * as Types from "./types";

declare function PAccSecurity(props: {
  as?: React.ElementType;
  passwordClick?: Types.Devlink.RuntimeProps;
  bioToglClick?: Types.Devlink.RuntimeProps;
  bioToglRowClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
  deleteClick?: Types.Devlink.RuntimeProps;
  fnameOnChange?: Types.Builtin.Text;
  lnameOnChange?: Types.Builtin.Text;
  phoneOnChange?: Types.Builtin.Text;
  emailOnChange?: Types.Builtin.Text;
}): React.JSX.Element;
