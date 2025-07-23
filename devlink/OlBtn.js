"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./OlBtn.module.css";

export function OlBtn({
  as: _Component = _Builtin.Block,
  btn = true,
  btnIcn = true,
  btnTxt = false,
  btnIcnSrc = "EWdit",
  btnTxtSrc = "Edit",
  btnSz = "l",
  btnStyl = "pf",
  btnLoc = "br",

  btnLink = {
    href: "#",
  },

  btnClick = {},
}) {
  return btn ? (
    <_Component
      className={_utils.cx(_styles, "ol-btn--ds-m")}
      tag="div"
      data-loc={btnLoc}
    >
      <Button
        btnTxt={btnTxt}
        btnTxtSrc={btnTxtSrc}
        btnIcnSrc={btnIcnSrc}
        btnIcn={btnIcn}
        btnClick={btnClick}
        btnSz={btnSz}
        btnStyl={btnStyl}
        btnShdw="l"
      />
    </_Component>
  ) : null;
}
