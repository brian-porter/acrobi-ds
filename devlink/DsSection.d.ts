import * as React from "react";
import * as Types from "./types";

declare function DsSection(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
