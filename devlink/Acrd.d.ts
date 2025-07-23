import * as React from "react";
import * as Types from "./types";

declare function Acrd(props: {
  as?: React.ElementType;
  element?: Types.Builtin.Text;
  initial?: Types.Builtin.Text;
  single?: Types.Builtin.Text;
  acrdItmMap?: Types.Devlink.Slot;
}): React.JSX.Element;
