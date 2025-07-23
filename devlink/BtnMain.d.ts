import * as React from "react";
import * as Types from "./types";

declare function BtnMain(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  style?: "Primary" | "Secondary";
  link?: Types.Basic.Link;
  typeButtonSubmitReset?: Types.Builtin.Text;
}): React.JSX.Element;
