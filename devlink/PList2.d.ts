import * as React from "react";
import * as Types from "./types";

declare function PList2(props: {
  as?: React.ElementType;
  heroImgSrc?: Types.Asset.Image;
  heroHlineSrc?: React.ReactNode;
  heroSubtxtSrc?: React.ReactNode;
  heroQrClick?: Types.Devlink.RuntimeProps;
  heroMoreClick?: Types.Devlink.RuntimeProps;
  scanQrBtnClick?: Types.Devlink.RuntimeProps;
  searchFldClick?: Types.Devlink.RuntimeProps;
  createClick?: Types.Devlink.RuntimeProps;
  calDis?: Types.Builtin.Text;
  calClick?: Types.Devlink.RuntimeProps;
  alertClick?: Types.Devlink.RuntimeProps;
  captureDis?: Types.Builtin.Text;
  captureClick?: Types.Devlink.RuntimeProps;
  settingClick?: Types.Devlink.RuntimeProps;
  trendMap?: Types.Devlink.Slot;
  trendClick?: Types.Devlink.RuntimeProps;
  empty?: Types.Visibility.VisibilityConditions;
  emptyFriendClick?: Types.Devlink.RuntimeProps;
  emptyDiscoverClick?: Types.Devlink.RuntimeProps;
  emptyAddClick?: Types.Devlink.RuntimeProps;
  l2Grid?: Types.Visibility.VisibilityConditions;
  l2Map?: Types.Devlink.Slot;
  l2CellExample?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
