import * as React from "react";
import * as Types from "./types";

declare function PList3(props: {
  as?: React.ElementType;
  heroImgSrc?: Types.Asset.Image;
  heroHlineSrc?: React.ReactNode;
  heroSubtxtSrc?: React.ReactNode;
  heroQrClick?: Types.Devlink.RuntimeProps;
  heroMoreClick?: Types.Devlink.RuntimeProps;
  scanQrBtnClick?: Types.Devlink.RuntimeProps;
  searchFldClick?: Types.Devlink.RuntimeProps;
  addItmClick?: Types.Devlink.RuntimeProps;
  calDis?: Types.Builtin.Text;
  calClick?: Types.Devlink.RuntimeProps;
  nearbyDis?: Types.Builtin.Text;
  nearbyClick?: Types.Devlink.RuntimeProps;
  alertClick?: Types.Devlink.RuntimeProps;
  settingClick?: Types.Devlink.RuntimeProps;
  trendMap?: Types.Devlink.Slot;
  exampleTrending?: Types.Visibility.VisibilityConditions;
  itmGrid?: Types.Visibility.VisibilityConditions;
  itmMap?: Types.Devlink.Slot;
  empty?: Types.Visibility.VisibilityConditions;
  emptyScanClick?: Types.Devlink.RuntimeProps;
  emptyDiscoverClick?: Types.Devlink.RuntimeProps;
  emptyAddClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
