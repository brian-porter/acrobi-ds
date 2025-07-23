import * as React from "react";
import * as Types from "./types";

declare function Carousel(props: {
  as?: React.ElementType;
  arrows?: Types.Visibility.VisibilityConditions;
  pagination?: Types.Visibility.VisibilityConditions;
  img1Src?: Types.Asset.Image;
  img1Alt?: Types.Basic.AltText;
  img2Src?: Types.Asset.Image;
  img2Alt?: Types.Basic.AltText;
  img6Src?: Types.Asset.Image;
  img6Alt?: Types.Basic.AltText;
  options?: Types.Builtin.Text;
  id?: Types.Basic.IdTextInput;
}): React.JSX.Element;
