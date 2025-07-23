import * as React from "react";
import * as Types from "./types";

declare function MAddList(props: {
  as?: React.ElementType;
  titleSrc?: React.ReactNode;
  cancelClick?: Types.Devlink.RuntimeProps;
  acrdMap?: Types.Devlink.Slot;
  exampleAcrd?: Types.Visibility.VisibilityConditions;
  privBtnClick?: Types.Devlink.RuntimeProps;
  autoFocus?: Types.Builtin.Text;
  namePlaceholderSrc?: Types.Builtin.Text;
  nameOnChange?: Types.Builtin.Text;
  doBtnClick?: Types.Devlink.RuntimeProps;
  btmShdw?: Types.Builtin.Text;
}): React.JSX.Element;
