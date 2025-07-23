import * as React from "react";
import * as Types from "./types";

declare function PickPoint(props: {
  as?: React.ElementType;
  pickValueSrc?: React.ReactNode;
  pickPrice?: Types.Visibility.VisibilityConditions;
  pickPriceSrc?: React.ReactNode;
  bdgGrp?: Types.Visibility.VisibilityConditions;
  bdg1?: Types.Visibility.VisibilityConditions;
  bdg2?: Types.Visibility.VisibilityConditions;
  bdg3?: Types.Visibility.VisibilityConditions;
  bdg1Clr?: Types.Builtin.Text;
  bdg2Clr?: Types.Builtin.Text;
  bdg3Clr?: Types.Builtin.Text;
  pickCurrent?: Types.Builtin.Text;
  pickActive?: Types.Builtin.Text;
  pickClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
