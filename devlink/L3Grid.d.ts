import * as React from "react";
import * as Types from "./types";

declare function L3Grid(props: {
  as?: React.ElementType;
  l3Grid?: Types.Visibility.VisibilityConditions;
  itmMap?: Types.Devlink.Slot;
  itmImgSrc?: Types.Asset.Image;
  itmImgAlt?: Types.Basic.AltText;
  itmDesc?: React.ReactNode;
  itmAmt?: React.ReactNode;
  itmAmtHigh?: Types.Visibility.VisibilityConditions;
  itmAmtH?: React.ReactNode;
  itmClick?: Types.Devlink.RuntimeProps;
  itmAddClick?: Types.Devlink.RuntimeProps;
  itmAddBdg?: Types.Visibility.VisibilityConditions;
  itmAddBdgTxtSrc?: React.ReactNode;
  itmSeller1?: Types.Visibility.VisibilityConditions;
  itmSeller2?: Types.Visibility.VisibilityConditions;
  itmSeller3?: Types.Visibility.VisibilityConditions;
  itmSeller1Src?: Types.Asset.Image;
  itmSeller2Src?: Types.Asset.Image;
  itmSeller3Src?: Types.Asset.Image;
  exampleItem?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
