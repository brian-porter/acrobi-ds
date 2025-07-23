import * as React from "react";
import * as Types from "./types";

declare function MPriority(props: {
  as?: React.ElementType;
  highestClick?: Types.Devlink.RuntimeProps;
  highestOn?: Types.Visibility.VisibilityConditions;
  highClick?: Types.Devlink.RuntimeProps;
  highOn?: Types.Visibility.VisibilityConditions;
  mediumClick?: Types.Devlink.RuntimeProps;
  mediumOn?: Types.Visibility.VisibilityConditions;
  lowClick?: Types.Devlink.RuntimeProps;
  lowOn?: Types.Visibility.VisibilityConditions;
  lowestClick?: Types.Devlink.RuntimeProps;
  lowestOn?: Types.Visibility.VisibilityConditions;
  noneClick?: Types.Devlink.RuntimeProps;
  noneOn?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
