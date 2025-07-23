import * as React from "react";
import * as Types from "./types";

declare function L1Grid(props: {
  as?: React.ElementType;
  l1Grid?: Types.Visibility.VisibilityConditions;
  l1Map?: Types.Devlink.Slot;
  cellExample?: Types.Visibility.VisibilityConditions;
  imgSrc?: Types.Asset.Image;
  imgAlt?: Types.Basic.AltText;
  pin?: Types.Visibility.VisibilityConditions;
  bookmark?: Types.Visibility.VisibilityConditions;
  chat?: Types.Visibility.VisibilityConditions;
  event?: Types.Visibility.VisibilityConditions;
  alert?: Types.Visibility.VisibilityConditions;
  bnrIcnSrc?: React.ReactNode;
  bnrTxtSrc?: React.ReactNode;
  cardClick?: Types.Devlink.RuntimeProps;
  slotId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
