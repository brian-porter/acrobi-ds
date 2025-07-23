import * as React from "react";
import * as Types from "./types";

declare function SwitchGrpCtrl(props: {
  as?: React.ElementType;
  tglMap?: Types.Devlink.Slot;
  exampleToggleGroup?: Types.Visibility.VisibilityConditions;
  exampleTglLableSrc?: React.ReactNode;
  exampleTglClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
