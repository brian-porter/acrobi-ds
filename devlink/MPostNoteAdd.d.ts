import * as React from "react";
import * as Types from "./types";

declare function MPostNoteAdd(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  itmHead?: Types.Visibility.VisibilityConditions;
  itmImgSrc?: Types.Asset.Image;
  itmImgAlt?: Types.Basic.AltText;
  itmName?: React.ReactNode;
  titleChange?: Types.Builtin.Text;
  titleClick?: Types.Devlink.RuntimeProps;
  bodyChange?: Types.Builtin.Text;
  bodyClick?: Types.Devlink.RuntimeProps;
  mediaChange?: Types.Builtin.Text;
  mediaClick?: Types.Devlink.RuntimeProps;
  uploadMap?: Types.Devlink.Slot;
  uploadExample?: Types.Visibility.VisibilityConditions;
  emojiBtnClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
