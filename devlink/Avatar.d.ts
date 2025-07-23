import * as React from "react";
import * as Types from "./types";

declare function Avatar(props: {
  as?: React.ElementType;
  avtr?: Types.Visibility.VisibilityConditions;
  avtrSrc?: Types.Asset.Image;
  avtrAlt?: Types.Basic.AltText;
  avtrSz?: Types.Builtin.Text;
  avtrShape?: Types.Builtin.Text;
  avtrDrpShdw?: Types.Builtin.Text;
  avtrGroup?: Types.Builtin.Text;
  avtrLink?: Types.Builtin.Text;
  avtrClick?: Types.Devlink.RuntimeProps;
  bdg?: Types.Visibility.VisibilityConditions;
  bdgTxt?: Types.Visibility.VisibilityConditions;
  bdgIcn?: Types.Visibility.VisibilityConditions;
  bdgTxtSrc?: React.ReactNode;
  bdgIcnSrc?: React.ReactNode;
  bdgClr?: Types.Builtin.Text;
  bdgSz?: Types.Builtin.Text;
  bdgIcnSz?: Types.Builtin.Text;
  bdgLoc?: Types.Builtin.Text;
  avtrOn?: Types.Builtin.Text;
}): React.JSX.Element;
