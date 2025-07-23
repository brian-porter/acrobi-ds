import * as React from "react";
import * as Types from "./types";

declare function SelectItem(props: {
  as?: React.ElementType;
  selectItm?: Types.Visibility.VisibilityConditions;
  lLIcn?: Types.Visibility.VisibilityConditions;
  lLIcnSrc?: React.ReactNode;
  lLIcnClr?: Types.Builtin.Text;
  lLItmDiv?: Types.Builtin.Text;
  pPTitleSrc?: React.ReactNode;
  pPSubtext?: Types.Visibility.VisibilityConditions;
  pPSubtxtSrc?: React.ReactNode;
  pPTitleSz?: Types.Builtin.Text;
  pPTitleClr?: Types.Builtin.Text;
  pPItmDiv?: Types.Builtin.Text;
  tTSelected?: Types.Visibility.VisibilityConditions;
  tTAcrdArrw?: Types.Visibility.VisibilityConditions;
  tTItmDiv?: Types.Builtin.Text;
  selectItmValue?: Types.Builtin.Text;
  selectItmClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
