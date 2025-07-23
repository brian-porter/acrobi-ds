import * as React from "react";
import * as Types from "./types";

declare function Size(props: {
  as?: React.ElementType;
  size?: "xxs" | "xs" | "s" | "sm" | "m" | "ml" | "l" | "xl" | "xxl";
  source?: React.ReactNode;
}): React.JSX.Element;
