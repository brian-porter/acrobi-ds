import * as React from "react";
import * as Types from "./types";

declare function SwiperSlide(props: {
  as?: React.ElementType;
  exampleSlideViz?: Types.Visibility.VisibilityConditions;
  cellMap?: Types.Devlink.Slot;
  exampleSlide?: Types.Visibility.VisibilityConditions;
  vizSrc?: Types.Asset.Image;
  vizAlt?: Types.Basic.AltText;
}): React.JSX.Element;
