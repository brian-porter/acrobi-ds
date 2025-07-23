import * as React from "react";
import * as Types from "./types";

declare function L2Grid(props: {
  as?: React.ElementType;
  l2Grid?: Types.Visibility.VisibilityConditions;
  l2Map?: Types.Devlink.Slot;
  cellExample?: Types.Visibility.VisibilityConditions;
  imgSrc?: Types.Asset.Image;
  imgAlt?: Types.Basic.AltText;
  pin?: Types.Visibility.VisibilityConditions;
  bookmark?: Types.Visibility.VisibilityConditions;
  chat?: Types.Visibility.VisibilityConditions;
  event?: Types.Visibility.VisibilityConditions;
  alert?: Types.Visibility.VisibilityConditions;
  name?: React.ReactNode;
  cellClick?: Types.Devlink.RuntimeProps;
  slotId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
