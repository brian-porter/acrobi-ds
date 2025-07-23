import * as React from "react";
import * as Types from "./types";

declare function BentoImg(props: {
  as?: React.ElementType;
  hline?: Types.Visibility.VisibilityConditions;
  hlineSubtxt?: Types.Visibility.VisibilityConditions;
  btn?: Types.Visibility.VisibilityConditions;
  btnIcn?: Types.Visibility.VisibilityConditions;
  btnTxt?: Types.Visibility.VisibilityConditions;
  img?: Types.Asset.Image;
  imgAlt?: Types.Basic.AltText;
  hlineTitleSrc?: React.ReactNode;
  hlineSubtxtSrc?: React.ReactNode;
  hlineLoc?: Types.Builtin.Text;
  hlineSz?: Types.Builtin.Text;
  hlineAlign?: Types.Builtin.Text;
  btnIcnSrc?: React.ReactNode;
  btnTxtSrc?: React.ReactNode;
  btnLoc?: Types.Builtin.Text;
  btnClick?: Types.Devlink.RuntimeProps;
  bentoClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
