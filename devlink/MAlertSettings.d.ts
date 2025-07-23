import * as React from "react";
import * as Types from "./types";

declare function MAlertSettings(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  muteValue?: React.ReactNode;
  muteClick?: Types.Devlink.RuntimeProps;
  notifyAllClick?: Types.Devlink.RuntimeProps;
  notifyMntClick?: Types.Devlink.RuntimeProps;
  notifyNoneClick?: Types.Devlink.RuntimeProps;
  hereTglClick?: Types.Devlink.RuntimeProps;
  mntToglClick?: Types.Devlink.RuntimeProps;
  hlightToglClick?: Types.Devlink.RuntimeProps;
  mbrHideToglClick?: Types.Devlink.RuntimeProps;
  muteEventToglClick?: Types.Devlink.RuntimeProps;
  dmToglClick?: Types.Devlink.RuntimeProps;
  pushToglClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
