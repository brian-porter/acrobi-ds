import * as React from "react";
import * as Types from "./types";

declare function MRoomAccess(props: {
  as?: React.ElementType;
  act1TxtSrc?: React.ReactNode;
  act1Click?: Types.Devlink.RuntimeProps;
  listMap?: Types.Devlink.Slot;
  listItmExample?: Types.Visibility.VisibilityConditions;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
