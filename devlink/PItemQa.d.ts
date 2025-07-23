import * as React from "react";
import * as Types from "./types";

declare function PItemQa(props: {
  as?: React.ElementType;
  itmImgSrc?: Types.Asset.Image;
  itmImgAlt?: Types.Basic.AltText;
  itmName?: React.ReactNode;
  askClick?: Types.Devlink.RuntimeProps;
  scanBtn?: Types.Visibility.VisibilityConditions;
  scanBtnClick?: Types.Devlink.RuntimeProps;
  searchClick?: Types.Devlink.RuntimeProps;
  searchChange?: Types.Builtin.Text;
  fltrBtn?: Types.Visibility.VisibilityConditions;
  fltrBtnClick?: Types.Devlink.RuntimeProps;
  postMap?: Types.Devlink.Slot;
  postExample?: Types.Visibility.VisibilityConditions;
  mediaAllClick?: Types.Devlink.RuntimeProps;
  mediaMap?: Types.Devlink.Slot;
  slotId?: Types.Basic.IdTextInput;
  mediaExample?: Types.Visibility.VisibilityConditions;
  peep?: Types.Visibility.VisibilityConditions;
  peepMap?: Types.Devlink.Slot;
  peepExample?: Types.Visibility.VisibilityConditions;
  peepStat1Src?: React.ReactNode;
  peepStat2Src?: React.ReactNode;
}): React.JSX.Element;
