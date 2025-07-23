import * as React from "react";
import * as Types from "./types";

declare function SwitchCtrl(props: {
  as?: React.ElementType;
  toglId?: Types.Builtin.Text;
  toglName?: Types.Builtin.Text;
  toglValue?: Types.Builtin.Text;
  tabOrder?: Types.Builtin.Text;
  onChange?: Types.Builtin.Text;
  toglClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
