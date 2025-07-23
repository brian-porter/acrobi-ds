import * as React from "react";
import * as Types from "./types";

declare function OlBannerFull(props: {
  as?: React.ElementType;
  bnr?: Types.Visibility.VisibilityConditions;
  lbl?: Types.Visibility.VisibilityConditions;
  avtrGrp?: Types.Visibility.VisibilityConditions;
  bnrLoc?: Types.Builtin.Text;
  bnrContAlign?: Types.Builtin.Text;
  lblTxt?: Types.Visibility.VisibilityConditions;
  lblIcn?: Types.Visibility.VisibilityConditions;
  lblTxtSrc?: React.ReactNode;
  lblIcnSrc?: React.ReactNode;
  lblSz?: Types.Builtin.Text;
  lblIcnLoc?: Types.Builtin.Text;
  avtr2?: Types.Visibility.VisibilityConditions;
  avtr3?: Types.Visibility.VisibilityConditions;
  avtr4?: Types.Visibility.VisibilityConditions;
  avtr5?: Types.Visibility.VisibilityConditions;
  avtr1Src?: Types.Asset.Image;
  avtr2Src?: Types.Asset.Image;
  avtr3Src?: Types.Asset.Image;
  avtr4Src?: Types.Asset.Image;
  avtr5Src?: Types.Asset.Image;
  avtrSz?: Types.Builtin.Text;
}): React.JSX.Element;
