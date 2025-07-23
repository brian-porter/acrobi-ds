import * as React from "react";
import * as Types from "./types";

declare function Dialog(props: {
  as?: React.ElementType;
  dialog?: Types.Visibility.VisibilityConditions;
  prevBtn?: Types.Visibility.VisibilityConditions;
  closeBtn?: Types.Visibility.VisibilityConditions;
  bgClick?: Types.Devlink.RuntimeProps;
  prevClick?: Types.Devlink.RuntimeProps;
  closeClick?: Types.Devlink.RuntimeProps;
  type?: Types.Builtin.Text;
  scrim?: Types.Builtin.Text;
  blur?: Types.Builtin.Text;
  shdw?: Types.Builtin.Text;
  dialogMap?: Types.Devlink.Slot;
  anchor?: Types.Builtin.Text;
}): React.JSX.Element;
