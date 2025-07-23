import * as React from "react";
import * as Types from "./types";

declare function MDelete(props: {
  as?: React.ElementType;
  remove?: Types.Visibility.VisibilityConditions;
  headSrc?: React.ReactNode;
  msgTitleSrc?: React.ReactNode;
  msgBodySrc?: React.ReactNode;
  objName?: React.ReactNode;
  objSubtxt?: React.ReactNode;
  objImgSrc?: Types.Asset.Image;
  objAvtrSrc?: Types.Asset.Image;
  objAvtr?: Types.Visibility.VisibilityConditions;
  objImg?: Types.Visibility.VisibilityConditions;
  passConf?: Types.Visibility.VisibilityConditions;
  act1TxtSrc?: React.ReactNode;
  act1Link?: Types.Basic.Link;
  icnSrc?: React.ReactNode;
  act1Styl?: Types.Builtin.Text;
  cancelClick?: Types.Devlink.RuntimeProps;
  act1Click?: Types.Devlink.RuntimeProps;
  btn1TxtSrc?: React.ReactNode;
  passFldBtnIcnSrc?: React.ReactNode;
  passFldBtnClick?: Types.Devlink.RuntimeProps;
  passChange?: Types.Builtin.Text;
}): React.JSX.Element;
