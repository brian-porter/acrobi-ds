import * as React from "react";
import * as Types from "./types";

declare function CardList1(props: {
  as?: React.ElementType;
  pin?: Types.Visibility.VisibilityConditions;
  bookmark?: Types.Visibility.VisibilityConditions;
  chat?: Types.Visibility.VisibilityConditions;
  event?: Types.Visibility.VisibilityConditions;
  alert?: Types.Visibility.VisibilityConditions;
  imgSrc?: Types.Asset.Image;
  imgAlt?: Types.Basic.AltText;
  imgAsp?: Types.Builtin.Text;
  bnrIcnSrc?: React.ReactNode;
  bnrTxtSrc?: React.ReactNode;
  cardDrpShdw?: Types.Builtin.Text;
  cardLink?: Types.Basic.Link;
  cardClick?: Types.Devlink.RuntimeProps;
  cardId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
