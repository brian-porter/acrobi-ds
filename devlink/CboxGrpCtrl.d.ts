import * as React from "react";
import * as Types from "./types";

declare function CboxGrpCtrl(props: {
  as?: React.ElementType;
  cboxCtrlMap?: Types.Devlink.Slot;
  exampleCboxCtrl?: Types.Visibility.VisibilityConditions;
  align?: Types.Builtin.Text;
  fieldItmTxtSrc?: React.ReactNode;
  fieldItmName?: Types.Builtin.Text;
  fieldItmValue?: Types.Builtin.Text;
  fieldItmActive?: Types.Builtin.Text;
  fieldItmClick?: Types.Devlink.RuntimeProps;
  fieldLink?: Types.Visibility.VisibilityConditions;
  fieldLinkTxtSrc?: React.ReactNode;
  fieldLinkClick?: Types.Devlink.RuntimeProps;
  fieldFbk?: Types.Visibility.VisibilityConditions;
  fieldFbkTxtSrc?: React.ReactNode;
  fieldFbkIcnSrc?: React.ReactNode;
  fieldFbkClr?: Types.Builtin.Text;
  fieldFbkIcnLoc?: Types.Builtin.Text;
}): React.JSX.Element;
