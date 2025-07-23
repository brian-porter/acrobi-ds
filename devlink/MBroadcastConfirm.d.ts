import * as React from "react";
import * as Types from "./types";

declare function MBroadcastConfirm(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  acceptClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
