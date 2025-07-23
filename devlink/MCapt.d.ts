import * as React from "react";
import * as Types from "./types";

declare function MCapt(props: {
  as?: React.ElementType;
  viewMap?: Types.Devlink.Slot;
  linkQr?: Types.Visibility.VisibilityConditions;
  linkQrMap?: Types.Devlink.Slot;
  linkQrExample?: Types.Visibility.VisibilityConditions;
  captResultBar?: Types.Visibility.VisibilityConditions;
  captResultMap?: Types.Devlink.Slot;
  captResultExample?: Types.Visibility.VisibilityConditions;
  scrimLast?: Types.Visibility.VisibilityConditions;
  scrimLastClick?: Types.Devlink.RuntimeProps;
  scrimLastImgSrc?: Types.Asset.Image;
  flashIconSrc?: React.ReactNode;
  flashClick?: Types.Devlink.RuntimeProps;
  captBtnClr?: Types.Builtin.Text;
  captBtnClick?: Types.Devlink.RuntimeProps;
  camFlipClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
