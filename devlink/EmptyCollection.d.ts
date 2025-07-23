import * as React from "react";
import * as Types from "./types";

declare function EmptyCollection(props: {
  as?: React.ElementType;
  empty?: Types.Visibility.VisibilityConditions;
  secBtn?: Types.Visibility.VisibilityConditions;
  tirBtn?: Types.Visibility.VisibilityConditions;
  btmDoc?: Types.Visibility.VisibilityConditions;
  icnSrc?: React.ReactNode;
  headlineSrc?: React.ReactNode;
  subtxtSrc?: React.ReactNode;
  secBtnTxtSrc?: React.ReactNode;
  tirBtnTxtSrc?: React.ReactNode;
  primeBtnTxtSrc?: React.ReactNode;
  primeBtnStyl?: Types.Builtin.Text;
  secBtnClick?: Types.Devlink.RuntimeProps;
  tirBtnClick?: Types.Devlink.RuntimeProps;
  primeBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
