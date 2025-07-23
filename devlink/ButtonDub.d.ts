import * as React from "react";
import * as Types from "./types";

declare function ButtonDub(props: {
  as?: React.ElementType;
  btn1IcnSrc?: React.ReactNode;
  btn1LblSrc?: React.ReactNode;
  btn1Tag?: Types.Visibility.VisibilityConditions;
  btn1TagQty?: React.ReactNode;
  btn1Click?: Types.Devlink.RuntimeProps;
  btn2IcnSrc?: React.ReactNode;
  btn2Click?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
