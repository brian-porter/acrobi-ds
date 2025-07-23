import * as React from "react";
import * as Types from "./types";

declare function ListNotice(props: {
  as?: React.ElementType;
  noticeSpace?: Types.Visibility.VisibilityConditions;
  noticeMsg?: Types.Visibility.VisibilityConditions;
  noticeMsgTxtSrc?: React.ReactNode;
  noticeMsgBgCl?: Types.Builtin.Text;
  noticeMsgClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
