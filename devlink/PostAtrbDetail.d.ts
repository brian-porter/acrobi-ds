import * as React from "react";
import * as Types from "./types";

declare function PostAtrbDetail(props: {
  as?: React.ElementType;
  atrbAvtr?: Types.Asset.Image;
  atrbAvtrAlt?: Types.Basic.AltText;
  atrbName?: React.ReactNode;
  atrbNameClr?: Types.Builtin.Text;
  atrbRank?: Types.Visibility.VisibilityConditions;
  atrbRankSrc?: React.ReactNode;
  atrbRankClr?: Types.Builtin.Text;
  atrbClick?: Types.Devlink.RuntimeProps;
  atrbAct?: Types.Visibility.VisibilityConditions;
  atrbActMoreClr?: Types.Builtin.Text;
  atrbActMoreClick?: Types.Devlink.RuntimeProps;
  atrbActTime?: React.ReactNode;
  atrbActTimeClr?: Types.Builtin.Text;
}): React.JSX.Element;
