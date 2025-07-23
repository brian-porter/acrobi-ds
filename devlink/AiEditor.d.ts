import * as React from "react";
import * as Types from "./types";

declare function AiEditor(props: {
  as?: React.ElementType;
  ai?: Types.Visibility.VisibilityConditions;
  grab?: Types.Devlink.RuntimeProps;
  output?: React.ReactNode;
  rowBtnMap?: Types.Devlink.Slot;
  inputChange?: Types.Builtin.Text;
  inputClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
