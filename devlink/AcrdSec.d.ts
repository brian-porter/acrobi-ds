import * as React from "react";
import * as Types from "./types";

declare function AcrdSec(props: {
  as?: React.ElementType;
  acrdSec?: Types.Visibility.VisibilityConditions;
  secIcn?: React.ReactNode;
  secName?: React.ReactNode;
  secClick?: Types.Devlink.RuntimeProps;
  secSubMap?: Types.Devlink.Slot;
  exampleSecSub?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
