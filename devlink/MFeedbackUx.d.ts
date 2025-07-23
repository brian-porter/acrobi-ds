import * as React from "react";
import * as Types from "./types";

declare function MFeedbackUx(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  lookValue?: Types.Builtin.Text;
  easeValue?: Types.Builtin.Text;
  installValue?: Types.Builtin.Text;
  firstChange?: Types.Builtin.Text;
  firstCount?: React.ReactNode;
  annoyChange?: Types.Builtin.Text;
  annoyCount?: React.ReactNode;
  sugChange?: Types.Builtin.Text;
  sugCount?: React.ReactNode;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
