import * as React from "react";
import * as Types from "./types";

declare function MSetDate(props: {
  as?: React.ElementType;
  clearClick?: Types.Devlink.RuntimeProps;
  dayValue?: React.ReactNode;
  dayClick?: Types.Devlink.RuntimeProps;
  timeValue?: React.ReactNode;
  timeClick?: Types.Devlink.RuntimeProps;
  durValue?: React.ReactNode;
  durClick?: Types.Devlink.RuntimeProps;
  repValue?: React.ReactNode;
  repClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
