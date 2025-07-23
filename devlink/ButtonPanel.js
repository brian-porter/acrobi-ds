"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./ButtonPanel.module.css";

export function ButtonPanel({
  as: _Component = _Builtin.Block,
  btnPnl = true,
  btn1 = true,
  btn2 = true,
  btn3 = true,
  btn1Txt = true,
  btn1Icn = false,
  btn2Txt = true,
  btn2Icn = false,
  btn3Txt = true,
  btn3Icn = false,
  btn1TxtSrc = "Label",
  btn1IcnSrc = "default",
  btn1Styl = "pf",
  btn1Sz = "l",
  btn1IcnLoc = "l",
  btn1Id,
  btn2TxtSrc = "Label",
  btn2IcnSrc = "default",
  btn2Styl = "nl",
  btn2Sz = "l",
  btn2IcnLoc = "l",
  btn2Id,
  btn3TxtSrc = "Label",
  btn3IcnSrc = "default",
  btn3Styl = "nl",
  btn3Sz = "l",
  btn3IcnLoc = "l",
  btn3Id,
  btnPnlId,
  btn1Act,
  btn2Act,
  btn3Act,
  btnPnlOri = "v",
  isMultiStep = "submit-btn",
  btn1Click = {},
  btn2Click = {},
  btn3Click = {},
  btn1Disabled = "false",
  btn2Disabled = "false",
  btn3Disabled = "false",

  btn1Link = {
    href: "#",
  },

  btn2Link = {
    href: "#",
  },

  btn3Link = {
    href: "#",
  },
}) {
  return btnPnl ? (
    <_Component
      className={_utils.cx(_styles, "btnpanel_wrap")}
      tag="div"
      data-ori={btnPnlOri}
      id={btnPnlId}
    >
      <Button
        btnIcn={btn1Icn}
        btnTxtSrc={btn1TxtSrc}
        btnIcnLoc={btn1IcnLoc}
        btnIcnSrc={btn1IcnSrc}
        btnTxt={btn1Txt}
        btnStyl={btn1Styl}
        btnSz={btn1Sz}
        btn={btn1}
        btnClick={btn1Click}
        disabled={btn1Disabled}
        btnLink={btn1Link}
        btnId="Btn1"
        lblShad="n"
        btnHug=""
      />
      <Button
        btnStyl={btn2Styl}
        btnIcn={btn2Icn}
        btnTxtSrc={btn2TxtSrc}
        btnIcnLoc={btn2IcnLoc}
        btnIcnSrc={btn2IcnSrc}
        btnTxt={btn2Txt}
        btnSz={btn2Sz}
        btn={btn2}
        btnClick={btn2Click}
        disabled={btn2Disabled}
        btnLink={btn2Link}
        btnId="Btn2"
        lblShad="n"
      />
      <Button
        btnStyl={btn3Styl}
        btnIcn={btn3Icn}
        btnTxtSrc={btn3TxtSrc}
        btnIcnLoc={btn3IcnLoc}
        btnIcnSrc={btn3IcnSrc}
        btnTxt={btn3Txt}
        btnSz={btn3Sz}
        btn={btn3}
        btnClick={btn3Click}
        disabled={btn3Disabled}
        btnLink={btn3Link}
        btnId="Btn3"
        lblShad="n"
      />
    </_Component>
  ) : null;
}
