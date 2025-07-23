import * as React from "react";
import * as Types from "./types";

declare function SecItmInfo(props: {
  as?: React.ElementType;
  itmNameSrc?: React.ReactNode;
  itmManufSrc?: React.ReactNode;
  acrdItmMap?: Types.Devlink.Slot;
  aboutSrc?: React.ReactNode;
  specsSrc?: React.ReactNode;
}): React.JSX.Element;
