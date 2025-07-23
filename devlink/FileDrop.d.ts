import * as React from "react";
import * as Types from "./types";

declare function FileDrop(props: {
  as?: React.ElementType;
  dz?: Types.Visibility.VisibilityConditions;
  dzIcn?: Types.Visibility.VisibilityConditions;
  dzImg?: Types.Visibility.VisibilityConditions;
  dzAvtr?: Types.Visibility.VisibilityConditions;
  dzIcnSrc?: React.ReactNode;
  dzIcnSz?: Types.Builtin.Text;
  dzImgSrc?: Types.Asset.Image;
  dzImgAlt?: Types.Basic.AltText;
  dzImgSz?: Types.Builtin.Text;
  dzAvtrSrc?: Types.Asset.Image;
  dzAvtrAlt?: Types.Basic.AltText;
  dzAvtrSz?: Types.Builtin.Text;
  dzTxtSrc?: React.ReactNode;
  dzChange?: Types.Builtin.Text;
  dzClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
