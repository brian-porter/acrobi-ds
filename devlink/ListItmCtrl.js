"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { LicLead } from "./LicLead";
import { LicPrime } from "./LicPrime";
import { LicTrail } from "./LicTrail";
import * as _utils from "./utils";
import _styles from "./ListItmCtrl.module.css";

export function ListItmCtrl({
  as: _Component = _Builtin.Block,
  listItem = true,
  leadDiv,
  primeDiv = "y",
  trailDiv = "y",
  listItemClick = {},
  lLIcn = false,
  lLImg = false,
  lLAvtr = false,
  lLAdptIcn = false,
  lLRdio = false,
  lLIcnSrc = "default",
  lLIcnClr = "p500",
  lLIcnSz = "s",
  lLImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  lLImgAlt = "__wf_reserved_inherit",
  lLImgSz = "l",
  lLAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  lLAvtrAlt = "__wf_reserved_inherit",
  lLAvtrSz = "m",
  lLAvtrBdg = false,
  lLAvtrBdgClr = "fd500",
  lLAvtrBdgSz = "m",
  primeClick = {},
  pPTitleSubtxt = true,
  pPMsg = false,
  pPAtrb = false,
  pPRate = false,
  pPTitleSrc = "ItemTitle",
  pPTitleSz = "r2",
  pPTitleLc = "1",
  pPSubtxt = true,
  pPSubtxtSrc = "Subtext",
  pPSubtxtSz = "r3",
  pPSubtxt2 = false,
  pPSubtxt2Src = "Subtext",
  pPSubtxt2Sz = "r3",
  trailClick = {},
  tTAct = false,
  tTIcn = false,
  tTBdg = false,
  tTBtn = false,
  tTSuprAct = false,
  tTRdio = false,
  tTTogl = false,
  tTActLbl1Txt = false,
  tTActLbl1Icn = true,
  tTActLbl1TxtSrc = "Label",
  tTActLbl1IcnSrc = "Moreh",

  tTActLink = {
    href: "#",
  },

  tTActLbl1Sz = "r3",
  tTActLbl1Clr = "in",
  tTActLbl2 = true,
  tTActLbl2Txt = true,
  tTActLbl2Icn = false,
  tTActLbl2TxtSrc = "14h",
  tTActLbl2IcnSrc = "default",
  tTActLbl2Clr = "in",
  tTIcnSrc = "Moreh",
  tTIcnClr,
  tTIcnSz = "s",
  tTBdgTxtSrc = "3",
  tTBdgClr = "p500",
  tTBtnTxt = true,
  tTBtnIcn = false,
  tTBtnTxtSrc = "Button",
  tTBtnIconSrc = "default",
  tTBtnSz = "s",
  tTBtnStyl = "nl",
  tTBtnClick = {},
  tTSuprActExp = false,
  tTSuprActExpTxtSrc = "more",
  tTSuprActExpIcnSrc = "nav_down",
  tTSuprActClick = {},
  tTSuprActExpClick = {},
  tTRdioIcn = "rdio_off",
  tTRdioClr = "n300",
  tTRdioSz = "m",
  tTRdioClick = {},
  tTToglClick = {},
  tTToglValue,
  lLAvtr2 = false,
  lLAvtr3 = false,
  lLAvtr4 = false,
  lLAvtr5 = false,
  lLAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  lLAvtr2Alt = "__wf_reserved_inherit",
  lLAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  lLAvtr3Alt = "__wf_reserved_inherit",
  lLAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  lLAvtr4Alt = "__wf_reserved_inherit",
  lLAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  lLAvtr5Alt = "__wf_reserved_inherit",
  lLAdptIcnSrc = "Default",
  lLAdptBgClr = "n500",
  lLAdptSz = "m",
  gttrBdg = false,
  gttrBdgPin = false,
  gttrBdgAlarm = false,
  gttrBdgBkmrk = false,
  pPMsgName = "FName LName",
  pPMsgTime = "xx",
  pPMsgBody = "Message body copy goes here and will wrap at the end of the line for as mny times as it needs to display the contents of the message.",
  pPRateTitleSz = "r2",
  pPRateValue = "3.5",
  lLRdioIcn = "rdio_off",
  lLRdioClr = "n300",
  lLRdioSz = "m",
  lLRdioClick = {},
}) {
  return listItem ? (
    <_Component
      className={_utils.cx(_styles, "listitem")}
      tag="div"
      {...listItemClick}
    >
      <GutterBadge
        gttrBdg={gttrBdg}
        pin={gttrBdgPin}
        bookmark={gttrBdgBkmrk}
        alarm={gttrBdgAlarm}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "lic-primary-wrap")}
        tag="div"
        {...primeClick}
      >
        <LicLead
          icnSrc={lLIcnSrc}
          icn={lLIcn}
          img={lLImg}
          imgSrc={lLImgSrc}
          adptIcn={lLAdptIcn}
          adptIcnSrc={lLAdptIcnSrc}
          avtr={lLAvtr}
          icnClr={lLIcnClr}
          icnSz={lLIcnSz}
          imgSz={lLImgSz}
          imgAlt={lLImgAlt}
          adptSz={lLAdptSz}
          adptBgClr={lLAdptBgClr}
          avtrSz={lLAvtrSz}
          leadDiv={leadDiv}
          avtrBdg={lLAvtrBdg}
          avtrBdgClr={lLAvtrBdgClr}
          avtrSrc={lLAvtrSrc}
          avtrAlt={lLAvtrAlt}
          avtr2={lLAvtr2}
          avtr3={lLAvtr3}
          avtr4={lLAvtr4}
          avtr5={lLAvtr5}
          avtr2Src={lLAvtr2Src}
          avtr2Alt={lLAvtr2Alt}
          avtr3Src={lLAvtr3Src}
          avtr3Alt={lLAvtr3Alt}
          avtr4Src={lLAvtr4Src}
          avtr4Alt={lLAvtr4Alt}
          avtr5Src={lLAvtr5Src}
          avtr5Alt={lLAvtr5Alt}
          rdio={lLRdio}
          rdioIcn={lLRdioIcn}
          rdioClr={lLRdioClr}
          rdioSz={lLRdioSz}
          rdioClick={lLRdioClick}
          avtrBdgSz={lLAvtrBdgSz}
        />
        <LicPrime
          titleSubtxt={pPTitleSubtxt}
          titleSrc={pPTitleSrc}
          rate={pPRate}
          titleSz={pPTitleSz}
          subtxtSz={pPSubtxtSz}
          subtxt={pPSubtxt}
          subtxt2Sz={pPSubtxt2Sz}
          subtxt2={pPSubtxt2}
          subtxtSrc={pPSubtxtSrc}
          subtxt2Src={pPSubtxt2Src}
          rateValue={pPRateValue}
          primeDiv={primeDiv}
          titleLc={pPTitleLc}
          msg={pPMsg}
          msgName={pPMsgName}
          msgTime={pPMsgTime}
          msgBody={pPMsgBody}
          atrb={pPAtrb}
        />
      </_Builtin.Block>
      <LicTrail
        suprAct={tTSuprAct}
        icnSrc={tTIcnSrc}
        actLbl2TxtSrc={tTActLbl2TxtSrc}
        actLbl2={tTActLbl2}
        togl={tTTogl}
        actLbl1IcnSrc={tTActLbl1IcnSrc}
        actLbl1Clr={tTActLbl1Clr}
        actLbl1Icn={tTActLbl1Icn}
        actLbl1Txt={tTActLbl1Txt}
        actLbl1TxtSrc={tTActLbl1TxtSrc}
        actLbl2Clr={tTActLbl2Clr}
        actLbl2Icn={tTActLbl2Icn}
        actLbl2IcnSrc={tTActLbl2IcnSrc}
        actLbl2Txt={tTActLbl2Txt}
        btn={tTBtn}
        actLbl1Sz={tTActLbl1Sz}
        btnTxtSrc={tTBtnTxtSrc}
        btnIcn={tTBtnIcn}
        btnTxt={tTBtnTxt}
        btnIconSrc={tTBtnIconSrc}
        btnSz={tTBtnSz}
        btnStyl={tTBtnStyl}
        btnClick={tTBtnClick}
        trailDiv={trailDiv}
        icnClr={tTIcnClr}
        trailClick={trailClick}
        toglValue={tTToglValue}
        toglClick={tTToglClick}
        icn={tTIcn}
        suprActExp={tTSuprActExp}
        suprActExpClick={tTSuprActExpClick}
        suprActClick={tTSuprActClick}
        suprActExpTxtSrc={tTSuprActExpTxtSrc}
        suprActExpIcnSrc={tTSuprActExpIcnSrc}
        bdg={tTBdg}
        bdgTxtSrc={tTBdgTxtSrc}
        bdgClr={tTBdgClr}
        rdio={tTRdio}
        rdioSrc={tTRdioIcn}
        rdioClr={tTRdioClr}
        rdioClick={tTRdioClick}
        icnSz={tTIcnSz}
        rdioSz={tTRdioSz}
        act={tTAct}
      />
    </_Component>
  ) : null;
}
