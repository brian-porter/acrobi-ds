import * as React from "react";
import * as Types from "./types";

declare function ImageGroup(props: {
  as?: React.ElementType;
  imgGrp?: Types.Visibility.VisibilityConditions;
  imgGrpSz?: Types.Builtin.Text;
  img2?: Types.Visibility.VisibilityConditions;
  img3?: Types.Visibility.VisibilityConditions;
  img4?: Types.Visibility.VisibilityConditions;
  img5?: Types.Visibility.VisibilityConditions;
  img1Src?: Types.Asset.Image;
  img1Alt?: Types.Basic.AltText;
  img2Src?: Types.Asset.Image;
  img2Alt?: Types.Basic.AltText;
  img3Src?: Types.Asset.Image;
  img3Alt?: Types.Basic.AltText;
  img4Src?: Types.Asset.Image;
  img4Alt?: Types.Basic.AltText;
  img5Src?: Types.Asset.Image;
  img5Alt?: Types.Basic.AltText;
}): React.JSX.Element;
