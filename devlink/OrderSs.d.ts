import * as React from "react";
import * as Types from "./types";

declare function OrderSs(props: {
  as?: React.ElementType;
  slotId?: Types.Basic.IdTextInput;
  sideFade?: Types.Visibility.VisibilityConditions;
  activityClick?: Types.Devlink.RuntimeProps;
  activityActive?: Types.Builtin.Text;
  usedClick?: Types.Devlink.RuntimeProps;
  usedActive?: Types.Builtin.Text;
  popClick?: Types.Devlink.RuntimeProps;
  popActive?: Types.Builtin.Text;
  dueClick?: Types.Devlink.RuntimeProps;
  dueActive?: Types.Builtin.Text;
  priorityClick?: Types.Devlink.RuntimeProps;
  priorityActive?: Types.Builtin.Text;
  nameClick?: Types.Devlink.RuntimeProps;
  nameActive?: Types.Builtin.Text;
  custom?: Types.Visibility.VisibilityConditions;
  customClick?: Types.Devlink.RuntimeProps;
  customActive?: Types.Builtin.Text;
}): React.JSX.Element;
