import * as React from "react";
import * as Types from "./types";

declare function BreadcrumbItem(props: {
  as?: React.ElementType;
  itmClick?: Types.Devlink.RuntimeProps;
  itmTxtSrc?: React.ReactNode;
}): React.JSX.Element;
