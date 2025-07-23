import * as React from "react";
import * as Types from "./types";

declare function CellPlacePrice(props: {
  as?: React.ElementType;
  cell?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  vizSrc?: Types.Asset.Image;
  vizAlt?: Types.Basic.AltText;
  vizSz?: Types.Builtin.Text;
  captTitleSrc?: React.ReactNode;
  captSubtxtSrc?: React.ReactNode;
  captSub2Src?: React.ReactNode;
  cellSz?: Types.Builtin.Text;
  cellCard?: Types.Builtin.Text;
  actClick?: Types.Devlink.RuntimeProps;
  cellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
