import * as React from "react";
import * as Types from "./types";

declare function OltIconBarShow(props: {
  as?: React.ElementType;
  icnL1?: Types.Visibility.VisibilityConditions;
  icnL2?: Types.Visibility.VisibilityConditions;
  icnL3?: Types.Visibility.VisibilityConditions;
  icnL1Src?: React.ReactNode;
  icnL2Src?: React.ReactNode;
  icnL3Src?: React.ReactNode;
  icnL1Id?: Types.Basic.IdTextInput;
  icnL2Id?: Types.Basic.IdTextInput;
  icnL3Id?: Types.Basic.IdTextInput;
  icnR1?: Types.Visibility.VisibilityConditions;
  icnR1Src?: React.ReactNode;
  icnR1Id?: Types.Basic.IdTextInput;
  icnR2?: Types.Visibility.VisibilityConditions;
  icnR2Src?: React.ReactNode;
  icnR2Id?: Types.Basic.IdTextInput;
  icnR3?: Types.Visibility.VisibilityConditions;
  icnR3Src?: React.ReactNode;
  icnR3Id?: Types.Basic.IdTextInput;
}): React.JSX.Element;
