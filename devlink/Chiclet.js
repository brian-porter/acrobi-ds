"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./Chiclet.module.css";

export function Chiclet({
  as: _Component = _Builtin.Block,
  chiclet = true,
  lbl = true,
  chicId,
  chicMulti,
  chicStyl = "nl",
  chicSz = "l",
  lblIcn = true,
  lblTxt = false,
  lblIcnSrc = "Nav_left",
  lblTxtSrc = "",
  lblSz = "r3",
  lblClr = "n700",
  chicClick = {},

  link = {
    href: "#",
  },
}) {
  return chiclet ? (
    <_Component
      className={_utils.cx(_styles, "bbc_l2-btn")}
      tag="div"
      data-chic-size={chicSz}
      data-chic-style={chicStyl}
      role="button"
      x-disabled="false"
      data-chic-active="false"
      data-chic-multi={chicMulti}
      {...chicClick}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "chiclet-lbl-sp")}
        tag="div"
      >
        <Label
          icnSrc={lblIcnSrc}
          lblSz={lblSz}
          lblClr={lblClr}
          lbl={lbl}
          txtSrc={lblTxtSrc}
          icn={lblIcn}
          txt={lblTxt}
          icnLoc="l"
          lblShad="n"
          lblGap="4"
        />
      </_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, "link-block-2")}
        button={false}
        id={chicId}
        block="inline"
        options={link}
      />
    </_Component>
  ) : null;
}
