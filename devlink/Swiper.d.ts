import * as React from "react";
import * as Types from "./types";

declare function Swiper(props: {
  as?: React.ElementType;
  swiper?: Types.Visibility.VisibilityConditions;
  slideMap?: Types.Devlink.Slot;
  exampleSlide?: Types.Visibility.VisibilityConditions;
  slideDetailMap?: Types.Devlink.Slot;
  exampleSlideDetail?: Types.Visibility.VisibilityConditions;
  swipVizSrc?: Types.Asset.Image;
  swipVizAlt?: Types.Basic.AltText;
}): React.JSX.Element;
