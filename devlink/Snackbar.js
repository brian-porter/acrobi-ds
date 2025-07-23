"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./Snackbar.module.css";

export function Snackbar({
  as: _Component = _Builtin.Block,
  sb = true,
  sbIcn = false,
  sbBtn = true,
  sbStyle = "none",
  sbIcnSrc = "default",
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbBtnTxtSrc = "Action",

  sbBtnLink = {
    href: "#",
  },

  sbBtnClick = {},
  sbLoc = "top",
}) {
  return sb ? (
    <_Component
      className={_utils.cx(_styles, "sb-bg")}
      tag="div"
      data-sb-loc={sbLoc}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "snackbar")}
        tag="div"
        data-bs="m"
        data-sb-style={sbStyle}
      >
        {sbIcn ? (
          <_Builtin.Block className={_utils.cx(_styles, "sb-icn-sp")} tag="div">
            <Icon icnSrc={sbIcnSrc} icnSz="m" />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "sb-txt")}
          tag="div"
          data-fs="r3"
          data-lc="2"
        >
          {sbTxtSrc}
        </_Builtin.Block>
        <Button
          btnTxtSrc={sbBtnTxtSrc}
          btn={sbBtn}
          btnClick={sbBtnClick}
          btnIcnSrc="act_close"
          btnIcnLoc="r"
          btnIcn={false}
          btnTxt={true}
          btnSz="l"
          lblSz="r3"
          btnHug="r"
          btnStyl="in"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
