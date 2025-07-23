import * as React from "react";
import * as Types from "./types";

declare function SliderCtrl(props: {
  as?: React.ElementType;
  single?: Types.Visibility.VisibilityConditions;
  dual?: Types.Visibility.VisibilityConditions;
  wrapperId?: Types.Builtin.Text;
  trackId?: Types.Builtin.Text;
  handleId?: Types.Builtin.Text;
  fillId?: Types.Builtin.Text;
  min?: Types.Builtin.Text;
  max?: Types.Builtin.Text;
  step?: Types.Builtin.Text;
  start?: Types.Builtin.Text;
  start2?: Types.Builtin.Text;
  value?: Types.Builtin.Text;
}): React.JSX.Element;
