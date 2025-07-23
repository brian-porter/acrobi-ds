import * as React from "react";
import * as Types from "./types";

declare function Spacer(props: {
  as?: React.ElementType;
  size?:
    | "0"
    | "1"
    | "8"
    | "16"
    | "24"
    | "32"
    | "40"
    | "48"
    | "56"
    | "64"
    | "80";
  szDep?: Types.Builtin.Text;
}): React.JSX.Element;
