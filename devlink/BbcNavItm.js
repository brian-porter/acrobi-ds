"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./BbcNavItm.module.css";

export function BbcNavItm({
  as: _Component = _Builtin.ListItem,
  itm = true,
  itmIcn = true,
  itmTxt = true,
  itmIcnSrc = "default",
  itmTxtSrc = "NavLbl",
  itmSz = "r2",
  itmClr = "n900",
  itmClick = {},
  active,
  itmLink = false,

  itmLinkSrc = {
    href: "#",
  },
}) {
  return itm ? (
    <_Component
      className={_utils.cx(_styles, "bbc-itm")}
      data-active={active}
      {...itmClick}
    >
      <Label
        txtSrc={itmTxtSrc}
        icn={itmIcn}
        txt={itmTxt}
        icnSrc={itmIcnSrc}
        lblSz={itmSz}
        lblClr={itmClr}
        lblGap="4"
      />
      {itmLink ? (
        <_Builtin.Link
          className={_utils.cx(_styles, "bbc-itm-link")}
          button={false}
          block="inline"
          options={itmLinkSrc}
        />
      ) : null}
    </_Component>
  ) : null;
}
