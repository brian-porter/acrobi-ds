import * as React from "react";
import * as Types from "./types";

declare function TxtClr(props: {
  as?: React.ElementType;
  color?:
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
  source?: React.ReactNode;
}): React.JSX.Element;
