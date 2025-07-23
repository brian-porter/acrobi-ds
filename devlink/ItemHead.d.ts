import * as React from "react";
import * as Types from "./types";

declare function ItemHead(props: {
  as?: React.ElementType;
  itmHead?: Types.Visibility.VisibilityConditions;
  itmImgSrc?: Types.Asset.Image;
  itmImgAlt?: Types.Basic.AltText;
  name?: React.ReactNode;
}): React.JSX.Element;
