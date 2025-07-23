import * as React from "react";
import * as Types from "./types";

declare function MGrpMngMember(props: {
  as?: React.ElementType;
  mMCancelClick?: Types.Devlink.RuntimeProps;
  mMEmptyInviteClick?: Types.Devlink.RuntimeProps;
  mMEmpty?: Types.Visibility.VisibilityConditions;
  mMAcrd?: Types.Visibility.VisibilityConditions;
  mMAcrdSecMap?: Types.Devlink.Slot;
  mMAddClick?: Types.Devlink.RuntimeProps;
  mMSearchClick?: Types.Devlink.RuntimeProps;
  mMSearchChange?: Types.Builtin.Text;
  mMAssignClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
