import * as React from "react";
import * as Types from "./types";

declare function HeroStack(props: {
  as?: React.ElementType;
  img?: Types.Visibility.VisibilityConditions;
  icn?: Types.Visibility.VisibilityConditions;
  subtxt?: Types.Visibility.VisibilityConditions;
  backBtn?: Types.Visibility.VisibilityConditions;
  imgMap?: Types.Devlink.Slot;
  imgSrc?: Types.Asset.Image;
  imgSz?: Types.Builtin.Text;
  icnSrc?: React.ReactNode;
  headlineSrc?: React.ReactNode;
  subtxtSrc?: React.ReactNode;
  backClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
