import * as React from "react";
import * as Types from "./types";

declare function Shadow(props: {
  as?: React.ElementType;
  source?: React.ReactNode;
  size?: "xxs" | "xs" | "s" | "sm" | "m" | "ml" | "l" | "xl" | "xxl";
  shadow?: "none" | "xs" | "s" | "m" | "l" | "xl";
}): React.JSX.Element;
