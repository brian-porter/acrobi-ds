import * as React from "react";
import * as Types from "./types";

declare function MFeedbackBug(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  bugChange?: Types.Builtin.Text;
  bugCount?: React.ReactNode;
  expectChange?: Types.Builtin.Text;
  expectCount?: React.ReactNode;
  actualChange?: Types.Builtin.Text;
  actualCount?: React.ReactNode;
  sugChange?: Types.Builtin.Text;
  sugCount?: React.ReactNode;
  anonChange?: Types.Builtin.Text;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
