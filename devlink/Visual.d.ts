import * as React from "react";
import * as Types from "./types";

declare function Visual(props: {
  as?: React.ElementType;
  componentVisualVisibility?: Types.Visibility.VisibilityConditions;
  componentClasses?: Types.Builtin.Text;
  imageImageVisibility?: Types.Visibility.VisibilityConditions;
  imageImageFile?: Types.Asset.Image;
  imageImageAltText?: Types.Basic.AltText;
  imageImageLoading?: Types.Builtin.Text;
  imageImagePosition?: Types.Builtin.Text;
  videoVideoVisibility?: Types.Visibility.VisibilityConditions;
  videoVideoUrl?: Types.Builtin.Text;
  videoVideoLoop?: Types.Builtin.Text;
  videoVideoAutoplay?: Types.Builtin.Text;
  videoVideoMuted?: Types.Builtin.Text;
  overlayOverlayVisibility?: Types.Visibility.VisibilityConditions;
  overlayOverlayOpacity?: Types.Builtin.Text;
}): React.JSX.Element;
