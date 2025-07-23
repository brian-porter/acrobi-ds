import * as React from "react";
import * as Types from "./types";

declare function Color(props: {
  as?: React.ElementType;
  on?: Types.Visibility.VisibilityConditions;
  source?: React.ReactNode;
  styleSize?: "xxs" | "xs" | "s" | "sm" | "m" | "ml" | "l" | "xl" | "xxl";
  styleColor?:
    | "n999"
    | "n900"
    | "n700"
    | "n500"
    | "n300"
    | "n200"
    | "n100"
    | "n000"
    | "p500"
    | "f500"
    | "fs500"
    | "fw500"
    | "fd500";
  styleShadow?: "none" | "xs" | "s" | "m" | "l" | "xl";
}): React.JSX.Element;
