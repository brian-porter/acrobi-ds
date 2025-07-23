import * as React from "react";
import * as Types from "./types";

declare function PickHead(props: {
  as?: React.ElementType;
  leadLbl?: React.ReactNode;
  trailLbl?: React.ReactNode;
  prev?: Types.Visibility.VisibilityConditions;
  next?: Types.Visibility.VisibilityConditions;
  prevLink?: Types.Basic.Link;
  prevClick?: Types.Devlink.RuntimeProps;
  primeClick?: Types.Devlink.RuntimeProps;
  nextLink?: Types.Basic.Link;
  nextClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
