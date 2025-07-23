import * as React from "react";
import * as Types from "./types";

declare function MFeedback(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  prodClick?: Types.Devlink.RuntimeProps;
  uxClick?: Types.Devlink.RuntimeProps;
  markClick?: Types.Devlink.RuntimeProps;
  bugClick?: Types.Devlink.RuntimeProps;
  genClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
