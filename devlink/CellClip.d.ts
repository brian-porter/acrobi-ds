import * as React from "react";
import * as Types from "./types";

declare function CellClip(props: {
  as?: React.ElementType;
  cellExample?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  vizSrc?: Types.Asset.Image;
  vizAlt?: Types.Basic.AltText;
  vizSz?: Types.Builtin.Text;
  vizAsp?: Types.Builtin.Text;
  capt?: Types.Visibility.VisibilityConditions;
  captTitleSrc?: React.ReactNode;
  typeSrc?: React.ReactNode;
  limitSrc?: React.ReactNode;
  expSrc?: React.ReactNode;
  cellSz?: Types.Builtin.Text;
  cellCard?: Types.Builtin.Text;
  cellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
