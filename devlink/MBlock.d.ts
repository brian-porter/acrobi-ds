import * as React from "react";
import * as Types from "./types";

declare function MBlock(props: {
  as?: React.ElementType;
  block?: Types.Visibility.VisibilityConditions;
  blockCancelClick?: Types.Devlink.RuntimeProps;
  blockAvtr?: Types.Asset.Image;
  blockAvtrAlt?: Types.Basic.AltText;
  blockTitle?: React.ReactNode;
  blockSubtxt?: React.ReactNode;
  blockDoClick?: Types.Devlink.RuntimeProps;
  unBlock?: Types.Visibility.VisibilityConditions;
  unBlockCancelClick?: Types.Devlink.RuntimeProps;
  unBlockAvtr?: Types.Asset.Image;
  unBlockAvtrAlt?: Types.Basic.AltText;
  unBlockTitle?: React.ReactNode;
  unBlockSubtxt?: React.ReactNode;
  unBlockDoClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
