"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./TabsSegBtn.module.css";

export function TabsSegBtn({
  as: _Component = _Builtin.Block,
  segBtnClr = "p",
  btn1Txt = true,
  btn1Icn = false,
  btn1TxtSrc = "SegBtn 1",
  btn1IcnSrc = "default",
  btn2Txt = true,
  btn2Icn = false,
  btn2TxtSrc = "SegBtn 2",
  btn2IcnSrc = "default",
  segBtn3 = true,
  btn3Txt = true,
  btn3Icn = false,
  btn3TxtSrc = "SegBtn 3",
  btn3IcnSrc = "default",
  segBtn4 = false,
  btn4Txt = true,
  btn4Icn = false,
  btn4TxtSrc = "SegBtn 4",
  btn4IcnSrc = "default",
  segBtn5 = false,
  btn5Txt = true,
  btn5Cn = false,
  btn5TxtSrc = "SegBtn 5",
  btn5IcnSrc = "default",
  seg1Map,
  seg2Map,
  seg3Map,
  seg4Map,
  seg5Map,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "segbtn_wrap")}
      tag="div"
      data-segbtn-clr={segBtnClr}
    >
      <_Builtin.TabsWrapper
        className={_utils.cx(_styles, "segbtns")}
        data-duration-in="300"
        data-duration-out="100"
        current="1"
        easing="ease-in-out"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "segbtn_menu")}
          tag="div"
        >
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "segbtn")}
            data-w-tab="1"
            data-SegBtn=""
            block="inline"
          >
            <Label
              txtSrc={btn1TxtSrc}
              icn={btn1Icn}
              txt={btn1Txt}
              icnSrc={btn1IcnSrc}
            />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "segbtn")}
            data-w-tab="2"
            block="inline"
          >
            <Label
              txtSrc={btn2TxtSrc}
              icn={btn2Icn}
              txt={btn2Txt}
              icnSrc={btn2IcnSrc}
            />
          </_Builtin.TabsLink>
          {segBtn3 ? (
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "segbtn")}
              data-w-tab="3"
              block="inline"
            >
              <Label
                txtSrc={btn3TxtSrc}
                icn={btn3Icn}
                txt={btn3Txt}
                icnSrc={btn3IcnSrc}
              />
            </_Builtin.TabsLink>
          ) : null}
          {segBtn4 ? (
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "segbtn")}
              data-w-tab="4"
              block="inline"
            >
              <Label
                txtSrc={btn4TxtSrc}
                icn={btn4Icn}
                txt={btn4Txt}
                icnSrc={btn4IcnSrc}
              />
            </_Builtin.TabsLink>
          ) : null}
          {segBtn5 ? (
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "segbtn")}
              data-w-tab="5"
              block="inline"
            >
              <Label
                txtSrc={btn5TxtSrc}
                icn={btn5Cn}
                txt={btn5Txt}
                icnSrc={btn5IcnSrc}
              />
            </_Builtin.TabsLink>
          ) : null}
        </_Builtin.TabsMenu>
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "seg-content")}
          tag="div"
        >
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "seg-detail")}
            tag="div"
            data-w-tab="1"
          >
            {seg1Map}
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "seg-detail")}
            tag="div"
            data-w-tab="2"
          >
            {seg2Map}
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "seg-detail")}
            tag="div"
            data-w-tab="3"
          >
            {seg3Map}
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "seg-detail")}
            tag="div"
            data-w-tab="4"
          >
            {seg4Map}
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "seg-detail")}
            tag="div"
            data-w-tab="5"
          >
            {seg5Map}
          </_Builtin.TabsPane>
        </_Builtin.TabsContent>
      </_Builtin.TabsWrapper>
    </_Component>
  );
}
