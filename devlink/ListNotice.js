"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./ListNotice.module.css";

export function ListNotice({
  as: _Component = _Builtin.Block,
  noticeSpace = true,
  noticeMsg = true,
  noticeMsgTxtSrc = "X new messages since {lastOpenTime}",
  noticeMsgBgCl = "f500",
  noticeMsgClick = {},
}) {
  return noticeSpace ? (
    <_Component className={_utils.cx(_styles, "notice-space")} tag="div">
      {noticeMsg ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "notice-msg")}
          tag="div"
          bg-clr={noticeMsgBgCl}
          {...noticeMsgClick}
        >
          <Label txtSrc={noticeMsgTxtSrc} lblSz="r3" icn={false} />
          <Label lblSz="r3" icnLoc="r" txtSrc="Mark Read" icnSrc="Clearcirc" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
