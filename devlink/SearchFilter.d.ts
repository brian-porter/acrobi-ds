import * as React from "react";
import * as Types from "./types";

declare function SearchFilter(props: {
  as?: React.ElementType;
  filterMap?: Types.Devlink.Slot;
  exampleMap?: Types.Visibility.VisibilityConditions;
  lBtnIcnSrc?: React.ReactNode;
  lBtnClick?: Types.Devlink.RuntimeProps;
  fldClick?: Types.Devlink.RuntimeProps;
  newBtnClick?: Types.Devlink.RuntimeProps;
  fldOnChange?: Types.Builtin.Text;
}): React.JSX.Element;
