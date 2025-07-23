import * as React from "react";
import * as Types from "./types";

declare function PostHeader(props: {
  as?: React.ElementType;
  header?: Types.Visibility.VisibilityConditions;
  hdrSubtxt?: Types.Visibility.VisibilityConditions;
  hdrImgSrc?: Types.Asset.Image;
  hdrImgAlt?: Types.Basic.AltText;
  hdrTitleSrc?: React.ReactNode;
  hdrSubtxtSrc?: React.ReactNode;
  hdrImgSz?: Types.Builtin.Text;
  hdrTitleSz?: Types.Builtin.Text;
  hdrTitleClr?: Types.Builtin.Text;
  hdrSubtxtSz?: Types.Builtin.Text;
  hdrSubtxtClr?: Types.Builtin.Text;
}): React.JSX.Element;
