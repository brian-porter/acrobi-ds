import * as React from "react";
import * as Types from "./types";

declare function PGroup2(props: {
  as?: React.ElementType;
  heroImgSrc?: Types.Asset.Image;
  heroHlineSrc?: React.ReactNode;
  heroSubtxtSrc?: React.ReactNode;
  heroSubtxt?: Types.Visibility.VisibilityConditions;
  heroQrClick?: Types.Devlink.RuntimeProps;
  heroMoreClick?: Types.Devlink.RuntimeProps;
  heroBtn?: Types.Visibility.VisibilityConditions;
  heroBtnClick?: Types.Devlink.RuntimeProps;
  scanQrBtnClick?: Types.Devlink.RuntimeProps;
  searchClick?: Types.Devlink.RuntimeProps;
  addGroupClick?: Types.Devlink.RuntimeProps;
  calClick?: Types.Devlink.RuntimeProps;
  alertClick?: Types.Devlink.RuntimeProps;
  captClick?: Types.Devlink.RuntimeProps;
  settingClick?: Types.Devlink.RuntimeProps;
  peepMap?: Types.Devlink.Slot;
  exampleTopPeep?: Types.Visibility.VisibilityConditions;
  g2Map?: Types.Devlink.Slot;
  p2Grid?: Types.Visibility.VisibilityConditions;
  p2Map?: Types.Devlink.Slot;
  p2Empty?: Types.Visibility.VisibilityConditions;
  p2EmptyFindClick?: Types.Devlink.RuntimeProps;
  p2EmptyAddClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
