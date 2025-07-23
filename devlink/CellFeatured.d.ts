import * as React from "react";
import * as Types from "./types";

declare function CellFeatured(props: {
  as?: React.ElementType;
  feature?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  vizSrc?: Types.Asset.Image;
  vizAlt?: Types.Basic.AltText;
  qr?: Types.Visibility.VisibilityConditions;
  more?: Types.Visibility.VisibilityConditions;
  byVizSrc?: Types.Asset.Image;
  byVizAlt?: Types.Basic.AltText;
  nameSrc?: React.ReactNode;
  hookSrc?: React.ReactNode;
  hook2?: Types.Visibility.VisibilityConditions;
  hook2Src?: React.ReactNode;
  qrClick?: Types.Devlink.RuntimeProps;
  moreClick?: Types.Devlink.RuntimeProps;
  ftrdClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
