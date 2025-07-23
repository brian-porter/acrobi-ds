"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MessageAction.module.css";

export function MessageAction({
  as: _Component = _Builtin.Link,
  msg = true,
  msgTxtSrc = "Message goes here, one line.",
  actTxtSrc = "CTA Link",
  txtClr = "f500",
  txtShad = "n",
  ctaTxtShad = "n",
  msgId = "Msg",
  msgClick = {},
}) {
  return msg ? (
    <_Component
      className={_utils.cx(_styles, "message")}
      button={false}
      data-form="next-btn"
      block="inline"
      options={{
        href: "#",
      }}
      {...msgClick}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "message-r3")}
        tag="div"
        data-ts={txtShad}
      >
        {msgTxtSrc}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "message-cta-r3")}
        tag="div"
        data-ts={ctaTxtShad}
        data-clr={txtClr}
      >
        {actTxtSrc}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
