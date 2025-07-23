import * as React from "react";
import * as Types from "./types";

declare function SwitchForm(props: {
  as?: React.ElementType;
  flds?: Types.Visibility.VisibilityConditions;
  lblTop?: Types.Visibility.VisibilityConditions;
  lblTopLblSrc?: React.ReactNode;
  lblTopLblFor?: Types.Builtin.Text;
  lblTopLblSz?: Types.Builtin.Text;
  lblTopLblClr?: Types.Builtin.Text;
  lblTopLblShdw?: Types.Builtin.Text;
  lblTopOpt?: Types.Visibility.VisibilityConditions;
  lblTopOptSrc?: React.ReactNode;
  lblTopOptSz?: Types.Builtin.Text;
  lblTopOptClr?: Types.Builtin.Text;
  fieldTglMap?: Types.Devlink.Slot;
  fieldExampleToggleGroup?: Types.Visibility.VisibilityConditions;
  fldHelp?: Types.Visibility.VisibilityConditions;
  fldHelpHelpL?: Types.Visibility.VisibilityConditions;
  fldHelpHelpR?: Types.Visibility.VisibilityConditions;
  fldHelpHelpLSrc?: React.ReactNode;
  fldHelpHelpRSrc?: React.ReactNode;
  fldHelpHelpShdw?: Types.Builtin.Text;
  fieldTglLableSrc?: React.ReactNode;
  fieldTglClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
