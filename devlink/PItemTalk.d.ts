import * as React from "react";
import * as Types from "./types";

declare function PItemTalk(props: {
  as?: React.ElementType;
  examplePostItems?: Types.Visibility.VisibilityConditions;
  exampleTwitPostItem?: Types.Visibility.VisibilityConditions;
  itmHead?: Types.Visibility.VisibilityConditions;
  itmImgSrc?: Types.Asset.Image;
  itmImgAlt?: Types.Basic.AltText;
  itmName?: React.ReactNode;
  postAddClick?: Types.Devlink.RuntimeProps;
  scanBtn?: Types.Visibility.VisibilityConditions;
  scanBtnClick?: Types.Devlink.RuntimeProps;
  searchClick?: Types.Devlink.RuntimeProps;
  searchChange?: Types.Builtin.Text;
  fltrBtn?: Types.Visibility.VisibilityConditions;
  inputWBtnsTFltrClick?: Types.Devlink.RuntimeProps;
  postMap?: Types.Devlink.Slot;
}): React.JSX.Element;
