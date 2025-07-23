import * as React from "react";
import * as Types from "./types";

declare function BtnGrp(props: {
  as?: React.ElementType;
  btnGrp?: Types.Visibility.VisibilityConditions;
  btnLblSz?: Types.Builtin.Text;
  btnLblClr?: Types.Builtin.Text;
  itmMap?: Types.Devlink.Slot;
  example?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
