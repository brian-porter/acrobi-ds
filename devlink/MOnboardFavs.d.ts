import * as React from "react";
import * as Types from "./types";

declare function MOnboardFavs(props: {
  as?: React.ElementType;
  shareBtnClick?: Types.Devlink.RuntimeProps;
  doBtnClick?: Types.Devlink.RuntimeProps;
  signUpFavs?: Types.Visibility.VisibilityConditions;
  sb?: Types.Visibility.VisibilityConditions;
  sbTxtSrc?: React.ReactNode;
  sbStyle?: Types.Builtin.Text;
  prevClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
