import * as React from "react";
import * as Types from "./types";

declare function MGroupList(props: {
  as?: React.ElementType;
  groupMap?: Types.Devlink.Slot;
  exampleGroup?: Types.Visibility.VisibilityConditions;
  groupActv?: Types.Visibility.VisibilityConditions;
  groupTag?: Types.Visibility.VisibilityConditions;
  groupImgSrc?: Types.Asset.Image;
  groupImgAlt?: Types.Basic.AltText;
  groupTagTxtSrc?: React.ReactNode;
  groupClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
