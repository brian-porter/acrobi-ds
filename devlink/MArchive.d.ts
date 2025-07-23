import * as React from "react";
import * as Types from "./types";

declare function MArchive(props: {
  as?: React.ElementType;
  headSrc?: React.ReactNode;
  act1TxtSrc?: React.ReactNode;
  act1Link?: Types.Basic.Link;
  objName?: React.ReactNode;
  objSubtxt?: React.ReactNode;
  objImg?: Types.Visibility.VisibilityConditions;
  objImgSrc?: Types.Asset.Image;
  objAvtrSrc?: Types.Asset.Image;
  objAvtr?: Types.Visibility.VisibilityConditions;
  msgTitleSrc?: React.ReactNode;
  msgBodySrc?: React.ReactNode;
  btnLabel?: React.ReactNode;
  passConf?: Types.Visibility.VisibilityConditions;
  btn1Click?: Types.Devlink.RuntimeProps;
  act1Click?: Types.Devlink.RuntimeProps;
  passChange?: Types.Builtin.Text;
}): React.JSX.Element;
