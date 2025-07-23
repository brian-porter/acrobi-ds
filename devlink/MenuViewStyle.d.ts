import * as React from "react";
import * as Types from "./types";

declare function MenuViewStyle(props: {
  as?: React.ElementType;
  menu?: Types.Visibility.VisibilityConditions;
  mini?: Types.Builtin.Text;
  popId?: Types.Basic.IdTextInput;
  anchorId?: Types.Builtin.Text;
  stack?: Types.Visibility.VisibilityConditions;
  stackOn?: Types.Visibility.VisibilityConditions;
  list?: Types.Visibility.VisibilityConditions;
  lIstOn?: Types.Visibility.VisibilityConditions;
  card?: Types.Visibility.VisibilityConditions;
  cardOn?: Types.Visibility.VisibilityConditions;
  grid?: Types.Visibility.VisibilityConditions;
  gridOn?: Types.Visibility.VisibilityConditions;
  masonry?: Types.Visibility.VisibilityConditions;
  masonryOn?: Types.Visibility.VisibilityConditions;
  carousel?: Types.Visibility.VisibilityConditions;
  carouselOn?: Types.Visibility.VisibilityConditions;
  stackClick?: Types.Devlink.RuntimeProps;
  listClick?: Types.Devlink.RuntimeProps;
  cardClick?: Types.Devlink.RuntimeProps;
  gridClick?: Types.Devlink.RuntimeProps;
  masonryClick?: Types.Devlink.RuntimeProps;
  carouselClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
