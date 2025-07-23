import * as React from "react";
import * as Types from "./types";

declare function MenuFilter(props: {
  as?: React.ElementType;
  menu?: Types.Visibility.VisibilityConditions;
  mini?: Types.Builtin.Text;
  popId?: Types.Basic.IdTextInput;
  anchorId?: Types.Builtin.Text;
  trending?: Types.Visibility.VisibilityConditions;
  trendingOn?: Types.Visibility.VisibilityConditions;
  trendingClick?: Types.Devlink.RuntimeProps;
  scan?: Types.Visibility.VisibilityConditions;
  scanOn?: Types.Visibility.VisibilityConditions;
  scanClick?: Types.Devlink.RuntimeProps;
  inteli?: Types.Visibility.VisibilityConditions;
  inteliOn?: Types.Visibility.VisibilityConditions;
  inteliClick?: Types.Devlink.RuntimeProps;
  buy?: Types.Visibility.VisibilityConditions;
  buyOn?: Types.Visibility.VisibilityConditions;
  buyClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
