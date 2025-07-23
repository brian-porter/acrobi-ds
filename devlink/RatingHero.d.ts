import * as React from "react";
import * as Types from "./types";

declare function RatingHero(props: {
  as?: React.ElementType;
  rateAvgValue?: React.ReactNode;
  rateQty?: React.ReactNode;
  r1Full?: Types.Visibility.VisibilityConditions;
  r1Half?: Types.Visibility.VisibilityConditions;
  r2Full?: Types.Visibility.VisibilityConditions;
  r2Half?: Types.Visibility.VisibilityConditions;
  r3Full?: Types.Visibility.VisibilityConditions;
  r3Half?: Types.Visibility.VisibilityConditions;
  r4Full?: Types.Visibility.VisibilityConditions;
  r4Half?: Types.Visibility.VisibilityConditions;
  r5Full?: Types.Visibility.VisibilityConditions;
  r5Half?: Types.Visibility.VisibilityConditions;
  bar1Qty?: Types.Devlink.RuntimeProps;
  bar2Qty?: Types.Devlink.RuntimeProps;
  bar3Qty?: Types.Devlink.RuntimeProps;
  bar4Qty?: Types.Devlink.RuntimeProps;
  bar5Qty?: Types.Devlink.RuntimeProps;
  bar1Click?: Types.Devlink.RuntimeProps;
  bar2Click?: Types.Devlink.RuntimeProps;
  bar3Click?: Types.Devlink.RuntimeProps;
  bar4Click?: Types.Devlink.RuntimeProps;
  bar5Click?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
