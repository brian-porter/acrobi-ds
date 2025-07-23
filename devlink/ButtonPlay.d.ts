import * as React from "react";
import * as Types from "./types";

declare function ButtonPlay(props: {
  as?: React.ElementType;
  visibility?: Types.Visibility.VisibilityConditions;
  buttonStyle?: "Primary" | "Secondary";
  text?: React.ReactNode;
  link?: Types.Basic.Link;
}): React.JSX.Element;
