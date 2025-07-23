import * as React from "react";
import * as Types from "./types";

declare function MFeedbackGen(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  easeValue?: Types.Builtin.Text;
  featValue?: Types.Builtin.Text;
  fastValue?: Types.Builtin.Text;
  reliableValue?: Types.Builtin.Text;
  overallValue?: Types.Builtin.Text;
  sugChange?: Types.Builtin.Text;
  sugCount?: React.ReactNode;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
