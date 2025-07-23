"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./BtnBarSs.module.css";

export function BtnBarSs({
  as: _Component = _Builtin.Block,
  btnBar = true,
  btn1 = true,
  btn2 = true,
  btn3 = true,
  btn4 = true,
  btn5 = true,
  btn6 = false,
  btn7 = false,
  btn8 = false,
  sideFade = true,
  btn1TxtSrc = "Label",
  btn1IcnSrc = "default",
  btn1Id,
  btn2TxtSrc = "Label",
  btn2IcnSrc = "default",
  btn2Id,
  btn3TxtSrc = "Label",
  btn3IcnSrc = "default",
  btn3Id,
  btn4TxtSrc = "Label",
  btn4IcnSrc = "default",
  btn4Id,
  btn5TxtSrc = "Label",
  btn5IcnSrc = "default",
  btn5Id,
  btn6TxtSrc = "Label",
  btn6IcnSrc = "default",
  btn6Id,
  btn7TxtSrc = "Label",
  btn7IcnSrc = "default",
  btn7Id,
  btn8TxtSrc = "Settings",
  btn8IcnSrc = "setting",
  btn8Id,
  btn1Click = {},
  btn2Click = {},
  btn3Click = {},
  btn4Click = {},
  btn5Click = {},
  btn6Click = {},
  btn7Click = {},
  btn8Click = {},
  btn1Dis = "false",
  btn2Dis = "false",
  btn3Dis = "false",
  btn4Dis = "false",
  btn5Dis = "false",
  btn6Dis = "false",
  btn7Dis = "false",
  btn8Dis = "false",
  slotId,
}) {
  return btnBar ? (
    <_Component className={_utils.cx(_styles, "bar-sidescroll")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "u-barbtngap-ss")}
        tag="div"
        id={slotId}
      >
        <Button
          btnTxtSrc={btn1TxtSrc}
          btnIcnSrc={btn1IcnSrc}
          btn={btn1}
          btnClick={btn1Click}
          disabled={btn1Dis}
          lblSz="r3"
          btnSz="d"
          btnId="Btn1"
          btnStyl="nl"
          btnIcnLoc="t"
          lblGap="0"
          btnHug="true"
        />
        <Button
          btnTxtSrc={btn2TxtSrc}
          btnIcnSrc={btn2IcnSrc}
          btn={btn2}
          btnClick={btn2Click}
          disabled={btn2Dis}
          lblSz="r3"
          btnIcnLoc="t"
          btnSz="d"
          btnId="Btn2"
          btnStyl="nl"
          lblGap=""
        />
        <Button
          btnTxtSrc={btn3TxtSrc}
          btnIcnSrc={btn3IcnSrc}
          btn={btn3}
          btnClick={btn3Click}
          disabled={btn3Dis}
          lblSz="r3"
          btnIcnLoc="t"
          btnSz="d"
          btnId="Btn3"
          btnStyl="nl"
          lblGap="0"
        />
        <Button
          btnTxtSrc={btn4TxtSrc}
          btnIcnSrc={btn4IcnSrc}
          btn={btn4}
          btnClick={btn4Click}
          disabled={btn4Dis}
          lblSz="r3"
          btnIcnLoc="t"
          btnSz="d"
          btnId="Btn4"
          btnStyl="nl"
          lblGap="0"
        />
        <Button
          btnTxtSrc={btn5TxtSrc}
          btnIcnSrc={btn5IcnSrc}
          btn={btn5}
          btnClick={btn5Click}
          disabled={btn5Dis}
          btnStyl="nl"
          lblSz="r3"
          btnIcnLoc="t"
          btnSz="d"
          btnId="Btn5"
          lblGap="0"
        />
        <Button
          btnTxtSrc={btn6TxtSrc}
          btnIcnSrc={btn6IcnSrc}
          btn={btn6}
          btnClick={btn6Click}
          disabled={btn6Dis}
          btnStyl="nl"
          lblSz="r3"
          btnIcnLoc="t"
          btnSz="d"
          btnId="Btn6"
          lblGap="0"
        />
        <Button
          btn={btn7}
          btnTxtSrc={btn7TxtSrc}
          btnIcnSrc={btn7IcnSrc}
          btnClick={btn7Click}
          disabled={btn7Dis}
          btnStyl="nl"
          lblSz="r3"
          btnIcnLoc="t"
          btnSz="d"
          btnId="Btn7"
          lblGap="0"
        />
        <Button
          btn={btn8}
          btnTxtSrc={btn8TxtSrc}
          btnIcnSrc={btn8IcnSrc}
          btnClick={btn8Click}
          disabled={btn8Dis}
          lblSz="r3"
          btnIcnLoc="t"
          btnSz="d"
          btnId="Btn8"
          btnStyl="nl"
          lblGap="0"
        />
      </_Builtin.Block>
      {sideFade ? (
        <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-l")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-r")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
