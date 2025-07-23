"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { LicLead } from "./LicLead";
import { LicPrime } from "./LicPrime";
import { LicTrail } from "./LicTrail";
import * as _utils from "./utils";
import _styles from "./ListItmContent.module.css";

export function ListItmContent({
  as: _Component = _Builtin.ListItem,
  lIcnL = false,
  lImg = false,
  lAvtr = false,
  lAdptIcn = false,
  lLRdio = false,
  lIcnSrc = "default",
  lIcnClr = "p500",
  lIcnSz = "s",
  lImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  lImgAlt = "__wf_reserved_inherit",
  lImgSz = "l",
  lAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  lAvtrAlt = "__wf_reserved_inherit",
  lAvtrShape = "c",
  lAvtrSz = "m",
  lAvtrBdg = false,
  lAvtrBdgSz = "m",
  lAvtrBdgClr = "fd500",
  lAdptIcnSrc = "Default",
  lAdptSz = "m",
  lAdptBgClr = "n500",
  lLDiv,
  pTitleSubtxt = true,
  pMsg = false,
  pRate = false,
  pAtrb = false,
  pTitleSrc = "ItmTitle",
  pTitleSz = "r2",
  pTitleClr = "n900",
  pTitleLc = "1",
  pSubtxt1 = false,
  pSubtxt1Src = "Subtext1",
  pSubtxt1Sz = "r3",
  pSubtxt1Clr = "n700",
  pSubtxt1Lc = "1",
  pSubtxt2 = false,
  pSubtxt2Src = "Subtext2",
  pSubtxt2Sz = "r3",
  pSubtxt2Clr = "n700",
  pSubtxt2Lc = "1",
  pMsgName = "FName LName",
  pMsgTime = "xx",
  pMsgBody = "Message body copy goes here and will wrap at the end of the line for as mny times as it needs to display the contents of the message.",
  pRateValue = "3.5",
  pRateTitleSz = "r2",
  pPClick = {},
  pPDiv = "y",
  tAct = false,
  tTIcn = false,
  tBtn = false,
  tSuprAct = false,
  tTRdio = false,
  tTogl = false,
  tBdg = false,
  tActLbl1Txt = false,
  tActLbl1Icn = true,
  tActLbl2 = true,
  tActLbl2Txt = true,
  tActLbl2Icn = false,
  tActLbl1TxtSrc = "Label",
  tActLbl1IcnSrc = "Moreh",
  tActLbl1Clr = "in",
  tActLbl1Sz = "r3",
  tActLbl2TxtSrc = "14h",
  tActLbl2IcnSrc = "default",
  tActLbl2Clr = "in",

  tActLink = {
    href: "#",
  },

  tActClick = {},
  tTIcnSrc = "Moreh",
  tTIcnClr = "n500",
  tTIcnSz = "s",
  tTIcnClick = {},
  tBtnTxt = true,
  tBtnIcn = false,
  tBtnTxtSrc = "Button",
  tBtnIconSrc = "default",
  tBtnSz = "s",
  tBtnStyl = "nl",
  tBtnClick = {},
  tSuprActExpTxtSrc = "more",
  tSuprActExpIcnSrc = "nav_down",
  tSuprActExp = false,
  tSuprActClick = {},
  tSuprActExpClick = {},
  tTRdioIcn = "circ_off",
  tTRdioClr = "n300",
  tTRdioSz = "m",
  tTRdioClick = {},
  listItm = true,
  tToglValue,
  tToglClick = {},
  listItmClick = {},
  gttrBdg = false,
  gttrPin = false,
  gttrAlarm = false,
  gttrBkmrk = false,
  lLRdioIcn = "rdio_off",
  lLRdioClr = "n300",
  lLRdioSz = "m",
  lLRdioClick = {},
  tBdgTxtSrc = "3",
  tBdgClr = "p500",
  tTrailClick = {},
  tTDiv = "y",
  slotId,
}) {
  return listItm ? (
    <_Component
      className={_utils.cx(_styles, "list_item_wrap")}
      id={slotId}
      {...listItmClick}
    >
      <GutterBadge
        gttrBdg={gttrBdg}
        pin={gttrPin}
        alarm={gttrAlarm}
        bookmark={gttrBkmrk}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "lic-primary-wrap")}
        tag="div"
        {...pPClick}
      >
        <LicLead
          imgSrc={lImgSrc}
          icnSrc={lIcnSrc}
          adptIcn={lAdptIcn}
          leadDiv={lLDiv}
          adptIcnSrc={lAdptIcnSrc}
          adptBgClr={lAdptBgClr}
          imgAlt={lImgAlt}
          avtr={lAvtr}
          icn={lIcnL}
          adptSz={lAdptSz}
          imgSz={lImgSz}
          avtrSz={lAvtrSz}
          icnSz={lIcnSz}
          icnClr={lIcnClr}
          img={lImg}
          avtrBdg={lAvtrBdg}
          avtrBdgClr={lAvtrBdgClr}
          avtrSrc={lAvtrSrc}
          avtrAlt={lAvtrAlt}
          rdio={lLRdio}
          rdioIcn={lLRdioIcn}
          rdioClr={lLRdioClr}
          rdioSz={lLRdioSz}
          rdioClick={lLRdioClick}
          avtrBdgSz={lAvtrBdgSz}
          avtrShape={lAvtrShape}
        />
        <LicPrime
          primeDiv={pPDiv}
          titleSubtxt={pTitleSubtxt}
          rateValue={pRateValue}
          subtxt={pSubtxt1}
          subtxtSz={pSubtxt1Sz}
          subtxtSrc={pSubtxt1Src}
          subtxt2={pSubtxt2}
          subtxt2Sz={pSubtxt2Sz}
          titleSz={pTitleSz}
          subtxt2Src={pSubtxt2Src}
          rate={pRate}
          titleSrc={pTitleSrc}
          titleClr={pTitleClr}
          subtxtClr={pSubtxt1Clr}
          subtxt2Clr={pSubtxt2Clr}
          titleLc={pTitleLc}
          subtxtLc={pSubtxt1Lc}
          subtxt2Lc={pSubtxt2Lc}
          atrb={pAtrb}
          msg={pMsg}
          msgName={pMsgName}
          msgTime={pMsgTime}
          msgBody={pMsgBody}
        />
      </_Builtin.Block>
      <LicTrail
        actLbl2Txt={tActLbl2Txt}
        btn={tBtn}
        btnIconSrc={tBtnIconSrc}
        actLbl1Txt={tActLbl1Txt}
        btnTxtSrc={tBtnTxtSrc}
        togl={tTogl}
        actLbl2Clr={tActLbl2Clr}
        btnTxt={tBtnTxt}
        actLbl1TxtSrc={tActLbl1TxtSrc}
        actLbl2={tActLbl2}
        actLbl2Icn={tActLbl2Icn}
        btnIcn={tBtnIcn}
        btnClick={tBtnClick}
        actLbl1Icn={tActLbl1Icn}
        btnStyl={tBtnStyl}
        actLbl1IcnSrc={tActLbl1IcnSrc}
        actLbl2TxtSrc={tActLbl2TxtSrc}
        actLbl2IcnSrc={tActLbl2IcnSrc}
        suprAct={tSuprAct}
        icnSrc={tTIcnSrc}
        btnSz={tBtnSz}
        actLbl1Clr={tActLbl1Clr}
        trailDiv={tTDiv}
        rdio={tTRdio}
        rdioSrc={tTRdioIcn}
        rdioClr={tTRdioClr}
        toglValue={tToglValue}
        toglClick={tToglClick}
        trailClick={tTrailClick}
        actLbl1Sz={tActLbl1Sz}
        icn={tTIcn}
        act={tAct}
        rdioClick={tTRdioClick}
        rdioSz={tTRdioSz}
        icnClr={tTIcnClr}
        bdg={tBdg}
        bdgTxtSrc={tBdgTxtSrc}
        bdgClr={tBdgClr}
        suprActExp={tSuprActExp}
        suprActExpTxtSrc={tSuprActExpTxtSrc}
        suprActExpIcnSrc={tSuprActExpIcnSrc}
        suprActClick={tSuprActClick}
        suprActExpClick={tSuprActExpClick}
        icnSz={tTIcnSz}
      />
    </_Component>
  ) : null;
}
