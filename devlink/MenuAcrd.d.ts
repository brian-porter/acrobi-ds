import * as React from "react";
import * as Types from "./types";

declare function MenuAcrd(props: {
  as?: React.ElementType;
  acrd?: Types.Visibility.VisibilityConditions;
  acrdSecMap?: Types.Devlink.Slot;
  exampleAcrdSec?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
