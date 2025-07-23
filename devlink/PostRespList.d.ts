import * as React from "react";
import * as Types from "./types";

declare function PostRespList(props: {
  as?: React.ElementType;
  resp?: Types.Visibility.VisibilityConditions;
  respQty?: React.ReactNode;
  respName?: React.ReactNode;
  respList?: Types.Visibility.VisibilityConditions;
  respListMap?: Types.Devlink.Slot;
  respItemExample?: Types.Visibility.VisibilityConditions;
  respEmpty?: Types.Visibility.VisibilityConditions;
  respEmptyIcnSrc?: React.ReactNode;
  respEmptyHlineSrc?: React.ReactNode;
  respEmptySubTxtSrc?: React.ReactNode;
  respEmptyCtaTxtSrc?: React.ReactNode;
  respEmptyClick?: Types.Devlink.RuntimeProps;
  answerBtn?: Types.Visibility.VisibilityConditions;
  answerBtnClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
