import * as React from "react";
import * as Types from "./types";

declare function RatingForm(props: {
  as?: React.ElementType;
  fld?: Types.Visibility.VisibilityConditions;
  fldLbl?: Types.Visibility.VisibilityConditions;
  fldHelp?: Types.Visibility.VisibilityConditions;
  fldTopLblSrc?: React.ReactNode;
  fldTopLblFor?: Types.Builtin.Text;
  fldTopLblSz?: Types.Builtin.Text;
  fldTopLblClr?: Types.Builtin.Text;
  fldTopLblShdw?: Types.Builtin.Text;
  fldTopOpt?: Types.Visibility.VisibilityConditions;
  fldTopOptSrc?: React.ReactNode;
  fldTopOptSz?: Types.Builtin.Text;
  fldTopOptClr?: Types.Builtin.Text;
  fieldValue?: React.ReactNode;
  fieldRateId?: Types.Basic.IdTextInput;
  fldHelpHelpL?: Types.Visibility.VisibilityConditions;
  fldHelpHelpR?: Types.Visibility.VisibilityConditions;
  fldHelpHelpLSrc?: React.ReactNode;
  fldHelpHelpRSrc?: React.ReactNode;
  fldHelpHelpShdw?: Types.Builtin.Text;
}): React.JSX.Element;
