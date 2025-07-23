import * as React from "react";
import * as Types from "./types";

declare function MQrShow(props: {
  as?: React.ElementType;
  qrShow?: Types.Visibility.VisibilityConditions;
  cancelClick?: Types.Devlink.RuntimeProps;
  qrMap?: Types.Devlink.Slot;
  exampleQr?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
