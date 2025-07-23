"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { Label } from "./Label";
import { SwitchCtrl } from "./SwitchCtrl";
import * as _utils from "./utils";
import _styles from "./LicTrail.module.css";

export function LicTrail({
  as: _Component = _Builtin.Block,
  act = false,
  icn = false,
  bdg = false,
  btn = false,
  suprAct = false,
  rdio = false,
  togl = false,
  actLbl1Txt = false,
  actLbl1Icn = true,
  actLbl1TxtSrc = "More",
  actLbl1IcnSrc = "Moreh",
  actLbl1Clr = "in",
  actLbl1Sz = "r3",
  actLbl2 = true,
  actLbl2Txt = true,
  actLbl2Icn = false,
  actLbl2TxtSrc = "2d",
  actLbl2IcnSrc = "default",
  actLbl2Clr = "in",
  icnSrc = "Moreh",
  icnClr = "n500",
  icnSz = "s",
  bdgTxtSrc = "3",
  bdgClr = "p500",
  suprActExp = false,
  suprActExpTxtSrc = "more",
  suprActExpIcnSrc = "nav_down",
  suprActClick = {},
  suprActExpClick = {},
  rdioSrc = "rdio_off",
  rdioClr = "n300",
  rdioSz = "m",
  rdioClick = {},
  btnIcn = false,
  btnTxt = true,
  btnTxtSrc = "Button",
  btnIconSrc = "default",
  btnSz = "s",
  btnStyl = "nl",
  btnClick = {},
  toglValue,
  toglClick = {},
  trailDiv = "y",
  trailClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "lic-trail")}
      tag="div"
      data-div={trailDiv}
      {...trailClick}
    >
      {btn ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-trail-btn")}
          tag="div"
        >
          <Button
            btnIcn={btnIcn}
            btnSz={btnSz}
            btnStyl={btnStyl}
            btnTxtSrc={btnTxtSrc}
            btnTxt={btnTxt}
            btnIcnSrc={btnIconSrc}
            btnClick={btnClick}
            lblClr="n500"
          />
        </_Builtin.Block>
      ) : null}
      {icn ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-trail-icn")}
          tag="div"
        >
          <Icon icnSrc={icnSrc} icnClr={icnClr} icnSz={icnSz} />
        </_Builtin.Block>
      ) : null}
      {bdg ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-trail-bdg")}
          tag="div"
        >
          <Badge bdgClr={bdgClr} bdgTxtSrc={bdgTxtSrc} bdgLoc="c" />
        </_Builtin.Block>
      ) : null}
      {act ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-trail-lbls")}
          tag="div"
        >
          <Label
            icnSrc={actLbl1IcnSrc}
            txt={actLbl1Txt}
            txtSrc={actLbl1TxtSrc}
            icn={actLbl1Icn}
            lblClr={actLbl1Clr}
            lblSz={actLbl1Sz}
            icnLoc="r"
          />
          <Label
            txtSrc={actLbl2TxtSrc}
            lbl={actLbl2}
            icn={actLbl2Icn}
            lblClr={actLbl2Clr}
            icnSrc={actLbl2IcnSrc}
            txt={actLbl2Txt}
            lblSz="r4"
            icnLoc="r"
          />
        </_Builtin.Block>
      ) : null}
      {suprAct ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-trail-supract")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "lic-trail-actbtn")}
            tag="div"
            {...suprActClick}
          >
            <Icon icnSz="sm" icnSrc="addcirc" />
          </_Builtin.Block>
          {suprActExp ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "lic-trail-more")}
              tag="div"
              {...suprActExpClick}
            >
              <Label
                txtSrc={suprActExpTxtSrc}
                icnSrc={suprActExpIcnSrc}
                lblSz="r4"
                icnLoc="r"
                icn={true}
                lblClr="n500"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {rdio ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-trail-rdio")}
          tag="div"
          {...rdioClick}
        >
          <Icon icnSrc={rdioSrc} icnClr={rdioClr} icnSz={rdioSz} />
        </_Builtin.Block>
      ) : null}
      {togl ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-trail-togl")}
          tag="div"
        >
          <SwitchCtrl toglClick={toglClick} />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
