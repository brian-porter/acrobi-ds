"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./Button.module.css";

export function Button({
  as: _Component = _Builtin.Link,
  btn = true,
  btnIcn = true,
  btnTxt = true,
  btnTxtSrc = "Button",
  btnIcnSrc = "default",
  btnSz,
  btnStyl = "nt",
  btnIcnLoc = "l",
  lblSz = "in",
  lblClr = "in",
  lblGap = "8",
  lblLc,
  lblShad = "n",
  btnHug,
  btnShdw = "n",
  target,
  btnId,
  disabled = "false",
  btnActive = "false",
  btnClick = {},

  btnLink = {
    href: "#",
  },
}) {
  return btn ? (
    <_Component
      className={_utils.cx(_styles, "btn-link")}
      button={false}
      data-btn-hug={btnHug}
      popovertarget={target}
      popovertargeaction="toggle"
      block="inline"
      options={btnLink}
      {...btnClick}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "btn")}
        tag="div"
        data-btn-size={btnSz}
        data-btn-style={btnStyl}
        data-bs={btnShdw}
        role="button"
        x-disabled={disabled}
        data-btn-active={btnActive}
        id={btnId}
      >
        <Label
          txtSrc={btnTxtSrc}
          icnLoc={btnIcnLoc}
          icn={btnIcn}
          icnSrc={btnIcnSrc}
          txt={btnTxt}
          lblSz={lblSz}
          lblClr={lblClr}
          lblShad={lblShad}
          lblGap={lblGap}
          lblLc={lblLc}
          lbl={true}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
