import * as React from "react";
import * as Types from "./types";

declare function MAuthTerms(props: {
  as?: React.ElementType;
  codeEmbed?: Types.Visibility.VisibilityConditions;
  termsMap?: Types.Devlink.Slot;
  backBtnClick?: Types.Devlink.RuntimeProps;
  acceptBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
