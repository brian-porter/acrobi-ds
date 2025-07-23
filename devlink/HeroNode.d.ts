import * as React from "react";
import * as Types from "./types";

declare function HeroNode(props: {
  as?: React.ElementType;
  sec?: Types.Visibility.VisibilityConditions;
  conVizSrc?: Types.Asset.Image;
  conVizAlt?: Types.Basic.AltText;
  conVizAsp?: Types.Builtin.Text;
  conIcnBarL1Icn?: Types.Visibility.VisibilityConditions;
  conIcnBarR1Icn?: Types.Visibility.VisibilityConditions;
  conIcnBarL1Src?: React.ReactNode;
  conIcnBarR1Src?: React.ReactNode;
  conIcnBarL1Click?: Types.Devlink.RuntimeProps;
  conIcnBarR1Click?: Types.Devlink.RuntimeProps;
  conHlineSrc?: React.ReactNode;
  conHlineSubtxt?: Types.Visibility.VisibilityConditions;
  conHlineSubtxtSrc?: React.ReactNode;
  conSideScroll?: Types.Visibility.VisibilityConditions;
  conCellMap?: Types.Devlink.Slot;
  conExampleCell?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
