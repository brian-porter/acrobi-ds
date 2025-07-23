import * as React from "react";
import * as Types from "./types";

declare function MSetDay(props: {
  as?: React.ElementType;
  clearClick?: Types.Devlink.RuntimeProps;
  month?: React.ReactNode;
  year?: React.ReactNode;
  prevClick?: Types.Devlink.RuntimeProps;
  monthClick?: Types.Devlink.RuntimeProps;
  nextClick?: Types.Devlink.RuntimeProps;
  dayMap?: Types.Devlink.Slot;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
