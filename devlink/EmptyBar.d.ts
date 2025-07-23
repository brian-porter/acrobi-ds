import * as React from "react";
import * as Types from "./types";

declare function EmptyBar(props: {
  as?: React.ElementType;
  empty?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  hlineSrc?: React.ReactNode;
  subTxtSrc?: React.ReactNode;
  ctaTxtSrc?: React.ReactNode;
  click?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
