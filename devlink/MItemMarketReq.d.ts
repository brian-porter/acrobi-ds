import * as React from "react";
import * as Types from "./types";

declare function MItemMarketReq(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  itmImgSrc?: Types.Asset.Image;
  itmImgAltTxt?: Types.Basic.AltText;
  itmNameSrc?: React.ReactNode;
  listAct1Click?: Types.Devlink.RuntimeProps;
  listItmMap?: Types.Devlink.Slot;
  shareHistClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
  exampleListItem?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
