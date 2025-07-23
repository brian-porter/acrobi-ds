import * as React from "react";
import * as Types from "./types";

declare function PMessaging(props: {
  as?: React.ElementType;
  groupList?: Types.Visibility.VisibilityConditions;
  groupListMap?: Types.Devlink.Slot;
  groupBtmBtn?: Types.Visibility.VisibilityConditions;
  groupMoreClick?: Types.Devlink.RuntimeProps;
  snip?: Types.Visibility.VisibilityConditions;
  snipMap?: Types.Devlink.Slot;
  roomList?: Types.Visibility.VisibilityConditions;
  roomListMap?: Types.Devlink.Slot;
  roomDetail?: Types.Visibility.VisibilityConditions;
  roomDetailMap?: Types.Devlink.Slot;
  mbrList?: Types.Visibility.VisibilityConditions;
  mbrListMap?: Types.Devlink.Slot;
}): React.JSX.Element;
