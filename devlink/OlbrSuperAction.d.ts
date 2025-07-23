import * as React from "react";
import * as Types from "./types";

declare function OlbrSuperAction(props: {
  as?: React.ElementType;
  actIcnSrc?: React.ReactNode;
  actLink?: Types.Basic.Link;
  actClick?: Types.Devlink.RuntimeProps;
  bdg?: Types.Visibility.VisibilityConditions;
  bdgTxtSrc?: React.ReactNode;
}): React.JSX.Element;
