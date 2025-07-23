import * as React from "react";
import * as Types from "./types";

declare function CellConnect(props: {
  as?: React.ElementType;
  cellExample?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  peep?: Types.Visibility.VisibilityConditions;
  brand?: Types.Visibility.VisibilityConditions;
  vizSrc?: Types.Asset.Image;
  vizAlt?: Types.Basic.AltText;
  vizSz?: Types.Builtin.Text;
  vizAsp?: Types.Builtin.Text;
  vizBdg?: Types.Visibility.VisibilityConditions;
  vizBdgClr?: Types.Builtin.Text;
  capt?: Types.Visibility.VisibilityConditions;
  captSubtxt?: Types.Visibility.VisibilityConditions;
  captTitleSrc?: React.ReactNode;
  captSubtxtSrc?: React.ReactNode;
  cellSz?: Types.Builtin.Text;
  cellCard?: Types.Builtin.Text;
  cellClick?: Types.Devlink.RuntimeProps;
  btn?: Types.Visibility.VisibilityConditions;
  btnTxtSrc?: React.ReactNode;
  btnIcnSrc?: React.ReactNode;
  btnStyl?: Types.Builtin.Text;
  btnDis?: Types.Builtin.Text;
  btnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
