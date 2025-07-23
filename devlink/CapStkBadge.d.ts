import * as React from "react";
import * as Types from "./types";

declare function CapStkBadge(props: {
  as?: React.ElementType;
  bdgTxtSrc?: React.ReactNode;
  bdgIcnSrc?: React.ReactNode;
  bdg?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
