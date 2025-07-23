import * as React from "react";
import * as Types from "./types";

declare function MRuleAdd(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  nameChange?: Types.Builtin.Text;
  descChange?: Types.Builtin.Text;
  erase?: Types.Visibility.VisibilityConditions;
  eraseClick?: Types.Devlink.RuntimeProps;
  doBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
