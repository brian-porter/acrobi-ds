import * as React from "react";
import * as Types from "./types";

declare function Chip(props: {
  as?: React.ElementType;
  chip?: Types.Visibility.VisibilityConditions;
  base?: Types.Visibility.VisibilityConditions;
  avtr?: Types.Visibility.VisibilityConditions;
  chipActive?: Types.Builtin.Text;
  chipIcn?: Types.Visibility.VisibilityConditions;
  chipTxt?: Types.Visibility.VisibilityConditions;
  chipIcnSrc?: React.ReactNode;
  chipTxtSrc?: React.ReactNode;
  chipStyle?: Types.Builtin.Text;
  chipTxtSz?: Types.Builtin.Text;
  chipTrail?: Types.Visibility.VisibilityConditions;
  chipTrailSrc?: React.ReactNode;
  chipDisabled?: Types.Builtin.Text;
  avtrSrc?: Types.Asset.Image;
  avtrBdg?: Types.Visibility.VisibilityConditions;
  avtrBdgIcnSrc?: React.ReactNode;
  avtrBdgClr?: Types.Builtin.Text;
  avtrTxtSrc?: React.ReactNode;
  avtrTrailSrc?: React.ReactNode;
  chipId?: Types.Basic.IdTextInput;
  chipClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
