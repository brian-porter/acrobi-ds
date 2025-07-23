import * as React from "react";
import * as Types from "./types";

declare function MReportOn(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  type?: React.ReactNode;
  disc?: React.ReactNode;
  bullets?: React.ReactNode;
  noteChange?: Types.Builtin.Text;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
