import * as React from "react";
import * as Types from "./types";

declare function CellLoyalty(props: {
  as?: React.ElementType;
  cell?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  vizSrc?: Types.Asset.Image;
  vizAlt?: Types.Basic.AltText;
  vizSz?: Types.Builtin.Text;
  nameSrc?: React.ReactNode;
  hookSrc?: React.ReactNode;
  hook2?: Types.Visibility.VisibilityConditions;
  hook2Src?: React.ReactNode;
  cellSz?: Types.Builtin.Text;
  cellCard?: Types.Builtin.Text;
  cellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
