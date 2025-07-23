import * as React from "react";
import * as Types from "./types";

declare function MGrpMngRooms(props: {
  as?: React.ElementType;
  rRCancelClick?: Types.Devlink.RuntimeProps;
  rREmpty?: Types.Visibility.VisibilityConditions;
  rREmptyAddClick?: Types.Devlink.RuntimeProps;
  rRAcrdSecMap?: Types.Devlink.Slot;
  rRAcrd?: Types.Visibility.VisibilityConditions;
  rRAcrdSecIcn?: React.ReactNode;
  rRAcrdSecName?: React.ReactNode;
  rRAcrdSecClick?: Types.Devlink.RuntimeProps;
  rRAcrdSecSubMap?: Types.Devlink.Slot;
  rRAddClick?: Types.Devlink.RuntimeProps;
  rRSearchClick?: Types.Devlink.RuntimeProps;
  rRSearchChange?: Types.Builtin.Text;
  rRSectionClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
