import * as React from "react";
import * as Types from "./types";

declare function CellCategory(props: {
  as?: React.ElementType;
  cell?: Types.Visibility.VisibilityConditions;
  vizSrc?: Types.Asset.Image;
  vizAlt?: Types.Basic.AltText;
  vizSz?: Types.Builtin.Text;
  vizAsp?: Types.Builtin.Text;
  vizShape?: Types.Builtin.Text;
  lblTxtSrc?: React.ReactNode;
  lblTxtSz?: Types.Builtin.Text;
  tag?: Types.Visibility.VisibilityConditions;
  tagTxtSrc?: React.ReactNode;
  tagClr?: Types.Builtin.Text;
  tagSz?: Types.Builtin.Text;
  tagLoc?: Types.Builtin.Text;
  cellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
