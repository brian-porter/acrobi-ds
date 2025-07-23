import * as React from "react";
import * as Types from "./types";

declare function ItmSecCta(props: {
  as?: React.ElementType;
  eyebrow?: Types.Visibility.VisibilityConditions;
  eyebrowSrc?: React.ReactNode;
  header?: React.ReactNode;
  desc?: React.ReactNode;
  link?: Types.Visibility.VisibilityConditions;
  linkSrc?: React.ReactNode;
  linkClick?: Types.Devlink.RuntimeProps;
  btnTxtSrc?: React.ReactNode;
  btnIcnSrc?: React.ReactNode;
  btnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
