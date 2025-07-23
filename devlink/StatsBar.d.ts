import * as React from "react";
import * as Types from "./types";

declare function StatsBar(props: {
  as?: React.ElementType;
  stats?: Types.Visibility.VisibilityConditions;
  stat1Src?: React.ReactNode;
  stat2Src?: React.ReactNode;
  stat3Src?: React.ReactNode;
  stat4Src?: React.ReactNode;
  stat2?: Types.Visibility.VisibilityConditions;
  stat3?: Types.Visibility.VisibilityConditions;
  stat4?: Types.Visibility.VisibilityConditions;
  clr?: Types.Builtin.Text;
}): React.JSX.Element;
