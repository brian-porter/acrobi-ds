import * as React from "react";
import * as Types from "./types";

declare function MMessageList(props: {
  as?: React.ElementType;
  notice?: Types.Visibility.VisibilityConditions;
  noticeMsg?: Types.Visibility.VisibilityConditions;
  noticeMsgBgCl?: Types.Builtin.Text;
  noticeMsgClick?: Types.Devlink.RuntimeProps;
  noticeMsgTxtSrc?: React.ReactNode;
  msgMap?: Types.Devlink.Slot;
  exampleMsg?: Types.Visibility.VisibilityConditions;
  exMsgGttrBdgPin?: Types.Visibility.VisibilityConditions;
  exMsgGttrBdgAlarm?: Types.Visibility.VisibilityConditions;
  exMsgGttrBdgBkmrk?: Types.Visibility.VisibilityConditions;
  exMsgAvtrSrc?: Types.Asset.Image;
  exMsgAvtrAlt?: Types.Basic.AltText;
  exMsgName?: React.ReactNode;
  exMsgTime?: React.ReactNode;
  exMsgBody?: React.ReactNode;
  exMsgClick?: Types.Devlink.RuntimeProps;
  bbc?: Types.Visibility.VisibilityConditions;
  bbcMap?: Types.Devlink.Slot;
}): React.JSX.Element;
