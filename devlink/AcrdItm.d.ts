import * as React from "react";
import * as Types from "./types";

declare function AcrdItm(props: {
  as?: React.ElementType;
  acrdItm?: Types.Visibility.VisibilityConditions;
  icn?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  titleTxtSrc?: React.ReactNode;
  body?: Types.Visibility.VisibilityConditions;
  bodySrc?: React.ReactNode;
  acrdItmMap?: Types.Devlink.Slot;
  exampleListItem?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
