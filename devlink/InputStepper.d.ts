import * as React from "react";
import * as Types from "./types";

declare function InputStepper(props: {
  as?: React.ElementType;
  inptStep?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  qty?: React.ReactNode;
  valueBgClr?: Types.Builtin.Text;
  inpstepBg?: Types.Builtin.Text;
  inptStepIcnClr?: Types.Builtin.Text;
  inptStepOri?: Types.Builtin.Text;
  inptStepShdw?: Types.Builtin.Text;
  valueTxtClr?: Types.Builtin.Text;
  moreClick?: Types.Devlink.RuntimeProps;
  lessClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
