import * as React from "react";
import * as Types from "./types";

declare function AcrdSecSub(props: {
  as?: React.ElementType;
  secSub?: Types.Visibility.VisibilityConditions;
  secSubIcn?: React.ReactNode;
  secSubName?: React.ReactNode;
  secSubClick?: Types.Devlink.RuntimeProps;
  secSubOn?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
