import * as React from "react";
import * as Types from "./types";

declare function MSend(props: {
  as?: React.ElementType;
  send?: Types.Visibility.VisibilityConditions;
  secTitleSrc?: React.ReactNode;
  cancelClick?: Types.Devlink.RuntimeProps;
  toFldBtn?: Types.Visibility.VisibilityConditions;
  toFldBtnClick?: Types.Devlink.RuntimeProps;
  subjFld?: Types.Visibility.VisibilityConditions;
  qrMap?: Types.Devlink.Slot;
  exampleQr?: Types.Visibility.VisibilityConditions;
  fromTxtSrc?: React.ReactNode;
  sendClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
