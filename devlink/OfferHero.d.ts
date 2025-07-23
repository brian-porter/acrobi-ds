import * as React from "react";
import * as Types from "./types";

declare function OfferHero(props: {
  as?: React.ElementType;
  offerHero?: Types.Visibility.VisibilityConditions;
  vizImg?: Types.Visibility.VisibilityConditions;
  vizVid?: Types.Visibility.VisibilityConditions;
  offAd?: Types.Visibility.VisibilityConditions;
  vizImgSrc?: Types.Asset.Image;
  vizImgAlt?: Types.Basic.AltText;
  vizVidSrc?: Types.Embed.Video;
  titleSrc?: React.ReactNode;
  byImgSrc?: Types.Asset.Image;
  byImgAlt?: Types.Basic.AltText;
  byTxtSrc?: React.ReactNode;
  expSrc?: React.ReactNode;
  vizClick?: Types.Devlink.RuntimeProps;
  captClick?: Types.Devlink.RuntimeProps;
  addClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
