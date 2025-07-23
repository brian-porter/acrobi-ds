import * as React from "react";
import * as Types from "./types";

declare function PickMonth(props: {
  as?: React.ElementType;
  month?: React.ReactNode;
  year?: React.ReactNode;
  prevClick?: Types.Devlink.RuntimeProps;
  monthClick?: Types.Devlink.RuntimeProps;
  nextClick?: Types.Devlink.RuntimeProps;
  dayMap?: Types.Devlink.Slot;
}): React.JSX.Element;
