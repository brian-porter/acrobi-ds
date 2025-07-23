import * as React from "react";
import * as Types from "./types";

declare function MRoomNew(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  mbrMap?: Types.Devlink.Slot;
  mbrItmExample?: Types.Visibility.VisibilityConditions;
  mbrAvtrSrc?: Types.Asset.Image;
  mbrAvtrAlt?: Types.Basic.AltText;
  mbrAvtrBdgClr?: Types.Builtin.Text;
  mbrTitleSrc?: React.ReactNode;
  mbrRdioIcn?: React.ReactNode;
  mbrRdioClr?: Types.Builtin.Text;
  mbrItmClick?: Types.Devlink.RuntimeProps;
  toFldPholdSrc?: Types.Builtin.Text;
  toFldOnChange?: Types.Builtin.Text;
  toFldClick?: Types.Devlink.RuntimeProps;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
