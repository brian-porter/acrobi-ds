import * as React from "react";
import * as Types from "./types";

declare function SecBillboardHead(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  con?: Types.Visibility.VisibilityConditions;
  conVizDeskSrc?: Types.Asset.Image;
  conVizMoSrc?: Types.Asset.Image;
  conVizAlt?: Types.Basic.AltText;
  conVizDeskAsp?: Types.Builtin.Text;
  conVizMoAsp?: Types.Builtin.Text;
  conCopyW?: Types.Builtin.Text;
  conCopyLoc?: Types.Builtin.Text;
  conTitleSrc?: React.ReactNode;
  conSubtxt?: Types.Visibility.VisibilityConditions;
  conSubtxtSrc?: React.ReactNode;
  conAlign?: Types.Builtin.Text;
  conTitleSz?: Types.Builtin.Text;
  conTitleClr?: Types.Builtin.Text;
  conSubtxtSz?: Types.Builtin.Text;
  conSubtxtClr?: Types.Builtin.Text;
  conTopHero?: Types.Builtin.Text;
  conSecLink?: Types.Basic.Link;
  conSecClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
