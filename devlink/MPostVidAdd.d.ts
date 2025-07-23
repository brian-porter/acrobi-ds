import * as React from "react";
import * as Types from "./types";

declare function MPostVidAdd(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  itmHead?: Types.Visibility.VisibilityConditions;
  itmImgSrc?: Types.Asset.Image;
  itmImgAlt?: Types.Basic.AltText;
  itmName?: React.ReactNode;
  vidLinkClick?: Types.Devlink.RuntimeProps;
  vidLinkChange?: Types.Builtin.Text;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
