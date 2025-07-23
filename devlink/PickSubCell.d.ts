import * as React from "react";
import * as Types from "./types";

declare function PickSubCell(props: {
  as?: React.ElementType;
  cellSrc?: React.ReactNode;
  cellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
