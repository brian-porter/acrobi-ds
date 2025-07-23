import * as React from "react";
import * as Types from "./types";

declare function OlIconbar(props: {
  as?: React.ElementType;
  icnBar?: Types.Visibility.VisibilityConditions;
  icnL1?: Types.Visibility.VisibilityConditions;
  icnL2?: Types.Visibility.VisibilityConditions;
  icnL3?: Types.Visibility.VisibilityConditions;
  icnR1?: Types.Visibility.VisibilityConditions;
  icnR2?: Types.Visibility.VisibilityConditions;
  icnR3?: Types.Visibility.VisibilityConditions;
  icnL1Src?: React.ReactNode;
  icnL2Src?: React.ReactNode;
  icnL3Src?: React.ReactNode;
  icnR1Src?: React.ReactNode;
  icnR2Src?: React.ReactNode;
  icnR3Src?: React.ReactNode;
}): React.JSX.Element;
