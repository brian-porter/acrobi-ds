import * as React from "react";
import * as Types from "./types";

declare function PostContent(props: {
  as?: React.ElementType;
  title?: Types.Visibility.VisibilityConditions;
  titleSrc?: React.ReactNode;
  rating?: Types.Visibility.VisibilityConditions;
  ratingSrc?: React.ReactNode;
  bodySrc?: React.ReactNode;
  bodyClamp?: Types.Builtin.Text;
  titleClr?: Types.Builtin.Text;
  bodyClr?: Types.Builtin.Text;
  acrd?: Types.Visibility.VisibilityConditions;
  acrdClick?: Types.Devlink.RuntimeProps;
  acrdTxtSrc?: React.ReactNode;
  acrdIcnSrc?: React.ReactNode;
  aside?: Types.Visibility.VisibilityConditions;
  postMoreClick?: Types.Devlink.RuntimeProps;
  postTime?: React.ReactNode;
  rank?: Types.Visibility.VisibilityConditions;
  rankMoreClick?: Types.Devlink.RuntimeProps;
  rankQty?: React.ReactNode;
  rankLessClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
