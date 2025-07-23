import * as React from "react";
import * as Types from "./types";

declare function MFeedbackProd(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  goalValue?: Types.Builtin.Text;
  stableValue?: Types.Builtin.Text;
  securityValue?: Types.Builtin.Text;
  integrationValue?: Types.Builtin.Text;
  goalsChange?: Types.Builtin.Text;
  goalsCount?: React.ReactNode;
  useChange?: Types.Builtin.Text;
  useCount?: React.ReactNode;
  badChange?: Types.Builtin.Text;
  badCount?: React.ReactNode;
  likeChange?: Types.Builtin.Text;
  likeCount?: React.ReactNode;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
