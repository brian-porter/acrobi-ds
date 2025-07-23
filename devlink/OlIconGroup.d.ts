import * as React from "react";
import * as Types from "./types";

declare function OlIconGroup(props: {
  as?: React.ElementType;
  icn1?: Types.Visibility.VisibilityConditions;
  icn1Src?: React.ReactNode;
  icn1Id?: Types.Basic.IdTextInput;
  icn2?: Types.Visibility.VisibilityConditions;
  icn2Src?: React.ReactNode;
  icn2Id?: Types.Basic.IdTextInput;
  icn3?: Types.Visibility.VisibilityConditions;
  icn3Src?: React.ReactNode;
  icn3Id?: Types.Basic.IdTextInput;
  iconGroupLocation?: Types.Builtin.Text;
  icn1Clr?: Types.Builtin.Text;
  icn2Clr?: Types.Builtin.Text;
  icn3Clr?: Types.Builtin.Text;
}): React.JSX.Element;
