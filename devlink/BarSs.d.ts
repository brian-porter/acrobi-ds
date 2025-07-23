import * as React from "react";
import * as Types from "./types";

declare function BarSs(props: {
  as?: React.ElementType;
  barMap?: Types.Devlink.Slot;
  slotId?: Types.Basic.IdTextInput;
  empty?: Types.Visibility.VisibilityConditions;
  emptyIcnSrc?: React.ReactNode;
  emptyHlineSrc?: React.ReactNode;
  emptySubTxtSrc?: React.ReactNode;
  emptyCtaTxtSrc?: React.ReactNode;
  emptyClick?: Types.Devlink.RuntimeProps;
  sideFade?: Types.Visibility.VisibilityConditions;
  barPad?: Types.Builtin.Text;
  example?: Types.Visibility.VisibilityConditions;
  exampleProdFeat?: Types.Visibility.VisibilityConditions;
  exampleBreadcrumb?: Types.Visibility.VisibilityConditions;
  exampleList?: Types.Visibility.VisibilityConditions;
  exampleConnectPeepBrand?: Types.Visibility.VisibilityConditions;
  exampleGroup?: Types.Visibility.VisibilityConditions;
  exampleCategories?: Types.Visibility.VisibilityConditions;
  exampleProd?: Types.Visibility.VisibilityConditions;
  cellGap?: Types.Builtin.Text;
}): React.JSX.Element;
