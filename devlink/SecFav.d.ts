import * as React from "react";
import * as Types from "./types";

declare function SecFav(props: {
  as?: React.ElementType;
  secHeadTitleIcnSrc?: React.ReactNode;
  sec?: Types.Visibility.VisibilityConditions;
  secHeadTitleSrc?: React.ReactNode;
  secAddClick?: Types.Devlink.RuntimeProps;
  conFavMap?: Types.Devlink.Slot;
  conExampleFavorite?: Types.Visibility.VisibilityConditions;
  exampleVizImg?: Types.Visibility.VisibilityConditions;
  exampleVizAvtr?: Types.Visibility.VisibilityConditions;
  exampleVizSrc?: Types.Asset.Image;
  exampleVizAlt?: Types.Basic.AltText;
  exampleTitleSrc?: React.ReactNode;
  exampleSubtxtSrc?: React.ReactNode;
  exampleFavClick?: Types.Devlink.RuntimeProps;
  exampleFavMoreClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
