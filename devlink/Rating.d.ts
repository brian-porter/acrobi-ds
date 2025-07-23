import * as React from "react";
import * as Types from "./types";

declare function Rating(props: {
  as?: React.ElementType;
  rating?: Types.Visibility.VisibilityConditions;
  r1Full?: Types.Visibility.VisibilityConditions;
  r1Half?: Types.Visibility.VisibilityConditions;
  r2Full?: Types.Visibility.VisibilityConditions;
  r2Half?: Types.Visibility.VisibilityConditions;
  r3Full?: Types.Visibility.VisibilityConditions;
  r3Half?: Types.Visibility.VisibilityConditions;
  r4Full?: Types.Visibility.VisibilityConditions;
  r4Half?: Types.Visibility.VisibilityConditions;
  r5Full?: Types.Visibility.VisibilityConditions;
  r5Half?: Types.Visibility.VisibilityConditions;
  value?: Types.Visibility.VisibilityConditions;
  qty?: Types.Visibility.VisibilityConditions;
  valueSrc?: React.ReactNode;
  qtySrc?: React.ReactNode;
  stack?: Types.Builtin.Text;
  sz?: Types.Builtin.Text;
}): React.JSX.Element;
