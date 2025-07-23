import * as React from "react";
import * as Types from "./types";

declare function OlIconAction(props: {
  as?: React.ElementType;
  icn?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  icnClr?: Types.Builtin.Text;
  icnSz?: Types.Builtin.Text;
  icnId?: Types.Basic.IdTextInput;
  icnClick?: Types.Devlink.RuntimeProps;
  icnDrpShdw?: Types.Builtin.Text;
}): React.JSX.Element;
