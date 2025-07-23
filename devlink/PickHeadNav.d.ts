import * as React from "react";
import * as Types from "./types";

declare function PickHeadNav(props: {
  as?: React.ElementType;
  pickNav?: Types.Visibility.VisibilityConditions;
  navIcnSrc?: React.ReactNode;
  navClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
