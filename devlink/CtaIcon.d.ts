import * as React from "react";
import * as Types from "./types";

declare function CtaIcon(props: {
  as?: React.ElementType;
  heroIconName?: React.ReactNode;
  heroHeadlineCopy?: React.ReactNode;
  heroDescriptionCopy?: React.ReactNode;
  hideLegacy?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
