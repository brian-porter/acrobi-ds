import * as React from "react";
import * as Types from "./types";

declare function MenuEditor(props: {
  as?: React.ElementType;
  txtSz?: Types.Visibility.VisibilityConditions;
  szHClick?: Types.Devlink.RuntimeProps;
  szLClick?: Types.Devlink.RuntimeProps;
  szMClick?: Types.Devlink.RuntimeProps;
  szSClick?: Types.Devlink.RuntimeProps;
  szTClick?: Types.Devlink.RuntimeProps;
  txtAlign?: Types.Visibility.VisibilityConditions;
  alignLClick?: Types.Devlink.RuntimeProps;
  alignCClick?: Types.Devlink.RuntimeProps;
  alignRClick?: Types.Devlink.RuntimeProps;
  alignJClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
