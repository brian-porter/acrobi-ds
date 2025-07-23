import * as React from "react";
import * as Types from "./types";

declare function PickMonthGrid(props: {
  as?: React.ElementType;
  pickMap?: Types.Devlink.Slot;
  daySrc?: React.ReactNode;
  price?: Types.Visibility.VisibilityConditions;
  priceSrc?: React.ReactNode;
  bdgGrp?: Types.Visibility.VisibilityConditions;
  bdg1?: Types.Visibility.VisibilityConditions;
  bdg2?: Types.Visibility.VisibilityConditions;
  bdg3?: Types.Visibility.VisibilityConditions;
  bdg1Clr?: Types.Builtin.Text;
  bdg2Clr?: Types.Builtin.Text;
  bdg3Clr?: Types.Builtin.Text;
  pickCurrent?: Types.Builtin.Text;
  pickActive?: Types.Builtin.Text;
  pickLink?: Types.Basic.Link;
  pickClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
