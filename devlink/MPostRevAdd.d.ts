import * as React from "react";
import * as Types from "./types";

declare function MPostRevAdd(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  itmHead?: Types.Visibility.VisibilityConditions;
  itmImgSrc?: Types.Asset.Image;
  itmImgAlt?: Types.Basic.AltText;
  itmName?: React.ReactNode;
  ratingMap?: Types.Devlink.Slot;
  ratingValue?: Types.Builtin.Text;
  hlineChange?: Types.Builtin.Text;
  hlineClick?: Types.Devlink.RuntimeProps;
  reviewChange?: Types.Builtin.Text;
  reviewClick?: Types.Devlink.RuntimeProps;
  mediaClick?: Types.Devlink.RuntimeProps;
  uploadMap?: Types.Devlink.Slot;
  uploadExample?: Types.Visibility.VisibilityConditions;
  mediaChange?: Types.Builtin.Text;
  emojiBtnClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
