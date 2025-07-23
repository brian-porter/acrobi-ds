"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./SegBtnCtrl.module.css";

export function SegBtnCtrl({
  as: _Component = _Builtin.Block,
  segBtn = true,
  btn1 = true,
  btn2 = true,
  btn3 = true,
  btn4 = false,
  btn5 = false,
  segBtnClr,
  btn1Btn1Txt = true,
  btn1Btn1Icn = true,
  btn1Btn1TxtSrc = "SegLbl",
  btn1Btn1IcnSrc = "default",
  btn1Btn1Actv = "false",
  btn1Btn1Click = {},
  btn2Btn2Txt = true,
  btn2Btn2Icn = true,
  btn2Btn2TxtSrc = "SegLbl",
  btn2Btn2IcnSrc = "default",
  btn2Btn2Actv = "true",
  btn2Btn2Click = {},
  btn3Btn3Txt = true,
  btn3Btn3Icn = true,
  btn3Btn3TxtSrc = "SegLbl",
  btn3Btn3IcnSrc = "default",
  btn3Btn3Actv = "false",
  btn3Btn3Click = {},
  btn4Btn4Txt = true,
  btn4Btn4Icn = true,
  btn4Btn4TxtSrc = "SegLbl",
  btn4Btn4IcnSrc = "default",
  btn4Btn4Actv = "false",
  btn4Btn4Click = {},
  btn5Btn5Txt = true,
  btn5Btn5Icn = true,
  btn5Btn5TxtSrc = "SegLbl",
  btn5Btn5IcnSrc = "default",
  btn5Btn5Actv = "false",
  btn5Btn5Click = {},
}) {
  return segBtn ? (
    <_Component className={_utils.cx(_styles, "segbtn_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "segbtn_menu")} tag="div">
        {btn1 ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "segbtn")}
            tag="div"
            data-active={btn1Btn1Actv}
            {...btn1Btn1Click}
          >
            <Label
              icn={btn1Btn1Icn}
              txtSrc={btn1Btn1TxtSrc}
              txt={btn1Btn1Txt}
              icnSrc={btn1Btn1IcnSrc}
            />
          </_Builtin.Block>
        ) : null}
        {btn2 ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "segbtn")}
            tag="div"
            data-active={btn2Btn2Actv}
            {...btn2Btn2Click}
          >
            <Label
              icn={btn2Btn2Icn}
              txtSrc={btn2Btn2TxtSrc}
              txt={btn2Btn2Txt}
              icnSrc={btn2Btn2IcnSrc}
            />
          </_Builtin.Block>
        ) : null}
        {btn3 ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "segbtn")}
            tag="div"
            data-active={btn3Btn3Actv}
            {...btn3Btn3Click}
          >
            <Label
              icn={btn3Btn3Icn}
              txtSrc={btn3Btn3TxtSrc}
              txt={btn3Btn3Txt}
              icnSrc={btn3Btn3IcnSrc}
            />
          </_Builtin.Block>
        ) : null}
        {btn4 ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "segbtn")}
            tag="div"
            data-active={btn4Btn4Actv}
            {...btn4Btn4Click}
          >
            <Label
              icn={btn4Btn4Icn}
              txtSrc={btn4Btn4TxtSrc}
              txt={btn4Btn4Txt}
              icnSrc={btn4Btn4IcnSrc}
            />
          </_Builtin.Block>
        ) : null}
        {btn5 ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "segbtn")}
            tag="div"
            data-active={btn5Btn5Actv}
            {...btn5Btn5Click}
          >
            <Label
              icn={btn5Btn5Icn}
              txtSrc={btn5Btn5TxtSrc}
              txt={btn5Btn5Txt}
              icnSrc={btn5Btn5IcnSrc}
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
