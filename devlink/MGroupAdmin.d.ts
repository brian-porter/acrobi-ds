import * as React from "react";
import * as Types from "./types";

declare function MGroupAdmin(props: {
  as?: React.ElementType;
  act1TxtSrc?: React.ReactNode;
  act1Click?: Types.Devlink.RuntimeProps;
  adminAvtrSrc?: Types.Asset.Image;
  adminName?: React.ReactNode;
  adminDesc?: React.ReactNode;
  adminMoreClick?: Types.Devlink.RuntimeProps;
  listMap?: Types.Devlink.Slot;
  listItmExample?: Types.Visibility.VisibilityConditions;
  searchClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
