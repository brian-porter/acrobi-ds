"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./BtnGrpItm.module.css";

export function BtnGrpItm({
  as: _Component = _Builtin.Block,
  btn = true,
  btnTxt = true,
  btnIcn = false,
  btnTxtSrc = "1",
  btnIcnSrc = "default",
  btnIcnLoc = "l",
  btnLoc,

  btnLink = {
    href: "#",
  },

  btnClick = {},
}) {
  return btn ? (
    <_Component
      className={_utils.cx(_styles, "btn-grp_itm")}
      tag="div"
      data-rad={btnLoc}
      {...btnClick}
    >
      <Label
        icnLoc={btnIcnLoc}
        txt={btnTxt}
        txtSrc={btnTxtSrc}
        icn={btnIcn}
        icnSrc={btnIcnSrc}
        lblSz="in"
      />
      <_Builtin.Link
        className={_utils.cx(_styles, "btn-grp_itm-link")}
        button={false}
        block="inline"
        options={btnLink}
      />
    </_Component>
  ) : null;
}
