import * as React from "react";
import * as Types from "./types";

declare function GmGrant(props: {
  as?: React.ElementType;
  img?: Types.Asset.Image;
  title?: React.ReactNode;
  dscrpt?: React.ReactNode;
  allowBtnTxt?: React.ReactNode;
  declineBtnTxt?: React.ReactNode;
  allowBtnLink?: Types.Basic.Link;
  declineBtnLink?: Types.Basic.Link;
  allowClick?: Types.Devlink.RuntimeProps;
  declineClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
