import * as React from "react";
import * as Types from "./types";

declare function AdaptIconGroup(props: {
  as?: React.ElementType;
  adpt1?: Types.Visibility.VisibilityConditions;
  adpt2?: Types.Visibility.VisibilityConditions;
  adpt3?: Types.Visibility.VisibilityConditions;
  adpt4?: Types.Visibility.VisibilityConditions;
  adpt5?: Types.Visibility.VisibilityConditions;
  adpt1IcnSrc?: React.ReactNode;
  adpt1BgClr?: Types.Builtin.Text;
  adpt2BgClr?: Types.Builtin.Text;
  adpt2CnSrc?: React.ReactNode;
  adpt3BgClr?: Types.Builtin.Text;
  adpt3IcnSrc?: React.ReactNode;
  adpt4BgClr?: Types.Builtin.Text;
  adpt4IcnSrc?: React.ReactNode;
  adpt5BgClr?: Types.Builtin.Text;
  adpt5IcnSrc?: React.ReactNode;
  grpSz?: Types.Builtin.Text;
  grpShp?: Types.Builtin.Text;
}): React.JSX.Element;
