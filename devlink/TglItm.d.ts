import * as React from "react";
import * as Types from "./types";

declare function TglItm(props: {
  as?: React.ElementType;
  fbk?: Types.Visibility.VisibilityConditions;
  lblSrc?: React.ReactNode;
  lblFor?: Types.Builtin.Text;
  tglId?: Types.Builtin.Text;
  tglName?: Types.Builtin.Text;
  tglValue?: Types.Builtin.Text;
  align?: Types.Builtin.Text;
  fbkFbkTxt?: Types.Visibility.VisibilityConditions;
  fbkFbkIcn?: Types.Visibility.VisibilityConditions;
  fbkFbkTxtSrc?: React.ReactNode;
  fbkFbkIcnSrc?: React.ReactNode;
  fbkFbkClr?: Types.Builtin.Text;
  tabOrder?: Types.Builtin.Text;
  tglClick?: Types.Devlink.RuntimeProps;
  tglRowClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
