import * as React from "react";
import * as Types from "./types";

declare function DsCode(props: {
  as?: React.ElementType;
  externalCode?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
