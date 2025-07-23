import * as React from "react";
import * as Types from "./types";

declare function OlSuperAction(props: {
  as?: React.ElementType;
  act?: Types.Visibility.VisibilityConditions;
  actIcnSrc?: React.ReactNode;
  actClick?: Types.Devlink.RuntimeProps;
  bdg?: Types.Visibility.VisibilityConditions;
  bdgTxtSrc?: React.ReactNode;
  inptStep?: Types.Visibility.VisibilityConditions;
  qty?: React.ReactNode;
  moreClick?: Types.Devlink.RuntimeProps;
  lessClick?: Types.Devlink.RuntimeProps;
  stepperMap?: Types.Devlink.Slot;
  slotId?: Types.Basic.IdTextInput;
}): React.JSX.Element;
