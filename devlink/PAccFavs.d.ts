import * as React from "react";
import * as Types from "./types";

declare function PAccFavs(props: {
  as?: React.ElementType;
  storeAddClick?: Types.Devlink.RuntimeProps;
  placeAddClick?: Types.Devlink.RuntimeProps;
  brandAddClick?: Types.Devlink.RuntimeProps;
  prodAddClick?: Types.Devlink.RuntimeProps;
  offerAddClick?: Types.Devlink.RuntimeProps;
  creatorAddClick?: Types.Devlink.RuntimeProps;
  offerMap?: Types.Devlink.Slot;
  placeMap?: Types.Devlink.Slot;
  brandMap?: Types.Devlink.Slot;
  prodMap?: Types.Devlink.Slot;
  creatorMap?: Types.Devlink.Slot;
  exampleStore?: Types.Visibility.VisibilityConditions;
  examplePlace?: Types.Visibility.VisibilityConditions;
  exampleBrand?: Types.Visibility.VisibilityConditions;
  exampleProduct?: Types.Visibility.VisibilityConditions;
  exampleOffer?: Types.Visibility.VisibilityConditions;
  exampleCreator?: Types.Visibility.VisibilityConditions;
  placeVizSrc?: Types.Asset.Image;
  placeVizAlt?: Types.Basic.AltText;
  placeTitleSrc?: React.ReactNode;
  placeSubtxtSrc?: React.ReactNode;
  placeClick?: Types.Devlink.RuntimeProps;
  placeMoreClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
