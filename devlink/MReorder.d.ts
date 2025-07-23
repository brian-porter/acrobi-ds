import * as React from "react";
import * as Types from "./types";

declare function MReorder(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  listMap?: Types.Devlink.Slot;
  exampleListItm?: Types.Visibility.VisibilityConditions;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
