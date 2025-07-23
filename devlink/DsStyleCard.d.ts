import * as React from "react";
import * as Types from "./types";

declare function DsStyleCard(props: {
  as?: React.ElementType;
  name?: React.ReactNode;
  value?: React.ReactNode;
  color?: Types.Builtin.Text;
  colored?: Types.Builtin.Text;
}): React.JSX.Element;
