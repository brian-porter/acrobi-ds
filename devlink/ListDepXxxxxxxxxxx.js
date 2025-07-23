"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ListItmContent } from "./ListItmContent";
import * as _utils from "./utils";
import _styles from "./ListDepXxxxxxxxxxx.module.css";

export function ListDepXxxxxxxxxxx({
  as: _Component = _Builtin.List,
  list = true,
  listItmMap,
  lIcnL = false,
  lImg = false,
  lAvtr = false,
  lAdptIcn = false,
  lLRdio = false,
  lIcnSrc = "default",
  pTitleSubtxt = true,
  pMsg = false,
  pTitleSrc = "ItmTitle",
  tAct = false,
  tTIcn = false,
  tBtn = false,
  tSuprAct = false,
  tTRdio = false,
  tTogl = false,
  tBdg = false,
  tTIcnSrc = "Moreh",
  listItmExample = true,
  lIcnClr = "p500",
  lIcnSz = "s",
  lImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  lImgAlt = "__wf_reserved_inherit",
  lImgSz = "l",
  lAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  lAvtrAlt = "__wf_reserved_inherit",
  lAvtrSz = "m",
  lAvtrBdg = false,
  lAvtrBdgClr = "fd500",
  lAvtrBdgSz = "m",
  lAdptIcnSrc = "Default",
  lAdptSz = "m",
  lAdptBgClr = "n500",
  lLDiv,
  pTitleSz = "r2",
  pTitleClr = "n900",
  pTitleLc = "1",
  pSubtxt = false,
  pSubtxtSrc = "Subtext1",
  pSubtxtSz = "r3",
  pSubtxtClr = "n700",
  pSubtxtLc = "1",
  pSubtxt2 = false,
  pSubtxt2Src = "Subtext2",
  pSubtxt2Sz = "r3",
  pSubtxt2Clr = "n700",
  pSubtxt2Lc = "1",
  pMsgName = "FName LName",
  pMsgTime = "xx",
  pMsgBody = "Message body copy goes here and will wrap at the end of the line for as mny times as it needs to display the contents of the message.",
  pAtrb = false,
  pPClick = {},
  pPDiv = "y",
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
  listItmClick = {},
  gttrBdg = false,
  gttrBdgPin = false,
  gttrBdgAlarm = false,
  gttrBdgBkmrk = false,
  tActLbl1Txt = false,
  tActLbl1Icn = true,
  tActLbl2 = true,
  tActLbl2Txt = true,
  tActLbl2Icn = false,
  tActLbl1TxtSrc = "Label",
  tActLbl1IcnSrc = "Moreh",
  tActLbl1Clr = "in",
  tActLbl1Sz = "r3",
  tActLbl2TxtSrc = "Lbl2",
  tActLbl2IcnSrc = "default",
  tActLbl2Clr = "in",
  tActClick = {},
  tSuprActExp = false,
  tSuprActExpTxtSrc = "more",
  tSuprActExpIcnSrc = "nav_down",
  tSuprActClick = {},
  tSuprActExpClick = {},
  tTRdioIcn = "circ_off",
  tTRdioClr = "n300",
  tTRdioSz = "m",
  tTRdioClick = {},
  tToglValue,
  tToglClick = {},
  lLRdioIcn = "rdio_off",
  lLRdioClr = "n300",
  lLRdioSz = "m",
  lLRdioClick = {},
  tBdgTxtSrc = "3",
  tBdgClr = "p500",
  tTrailClick = {},
  tTDiv = "y",
}) {
  return list ? (
    <_Component
      className={_utils.cx(_styles, "list_wrap")}
      tag="ul"
      unstyled={true}
    >
      {listItmMap ?? (
        <ListItmContent
          lIcnL={lIcnL}
          lImg={lImg}
          lAvtr={lAvtr}
          lAdptIcn={lAdptIcn}
          lIcnSrc={lIcnSrc}
          pTitleSrc={pTitleSrc}
          tBtn={tBtn}
          tSuprAct={tSuprAct}
          tTRdio={tTRdio}
          tTogl={tTogl}
          listItm={listItmExample}
          lIcnClr={lIcnClr}
          lIcnSz={lIcnSz}
          lImgSrc={lImgSrc}
          lImgAlt={lImgAlt}
          lImgSz={lImgSz}
          lAvtrSz={lAvtrSz}
          lAdptIcnSrc={lAdptIcnSrc}
          lAdptSz={lAdptSz}
          lAdptBgClr={lAdptBgClr}
          lLDiv={lLDiv}
          pTitleSubtxt={pTitleSubtxt}
          pTitleSz={pTitleSz}
          pTitleClr={pTitleClr}
          pSubtxt1={pSubtxt}
          pSubtxt2={pSubtxt2}
          pSubtxt1Src={pSubtxtSrc}
          pSubtxt2Src={pSubtxt2Src}
          pSubtxt1Sz={pSubtxtSz}
          pSubtxt2Sz={pSubtxt2Sz}
          pSubtxt1Clr={pSubtxtClr}
          pSubtxt2Clr={pSubtxt2Clr}
          pPDiv={pPDiv}
          tTIcnSrc={tTIcnSrc}
          tBtnTxt={tBtnTxt}
          tBtnIcn={tBtnIcn}
          tBtnTxtSrc={tBtnTxtSrc}
          tBtnIconSrc={tBtnIconSrc}
          tBtnSz={tBtnSz}
          tBtnStyl={tBtnStyl}
          tBtnClick={tBtnClick}
          pPClick={pPClick}
          tTIcn={tTIcn}
          tAct={tAct}
          listItmClick={listItmClick}
          lAvtrBdg={lAvtrBdg}
          lAvtrBdgClr={lAvtrBdgClr}
          lAvtrSrc={lAvtrSrc}
          lAvtrAlt={lAvtrAlt}
          pTitleLc={pTitleLc}
          pSubtxt1Lc={pSubtxtLc}
          pSubtxt2Lc={pSubtxt2Lc}
          pAtrb={pAtrb}
          gttrBdg={gttrBdg}
          gttrPin={gttrBdgPin}
          gttrAlarm={gttrBdgAlarm}
          gttrBkmrk={gttrBdgBkmrk}
          pMsg={pMsg}
          pMsgName={pMsgName}
          pMsgTime={pMsgTime}
          pMsgBody={pMsgBody}
          tActLbl1Txt={tActLbl1Txt}
          tActLbl1Icn={tActLbl1Icn}
          tActLbl2={tActLbl2}
          tActLbl2Txt={tActLbl2Txt}
          tActLbl2Icn={tActLbl2Icn}
          tActLbl1TxtSrc={tActLbl1TxtSrc}
          tActLbl1IcnSrc={tActLbl1IcnSrc}
          tActLbl1Clr={tActLbl1Clr}
          tActLbl1Sz={tActLbl1Sz}
          tActLbl2TxtSrc={tActLbl2TxtSrc}
          tActLbl2IcnSrc={tActLbl2IcnSrc}
          tActLbl2Clr={tActLbl2Clr}
          tActClick={tActClick}
          tTIcnClick={tTIcnClick}
          tSuprActExp={tSuprActExp}
          tSuprActClick={tSuprActClick}
          tSuprActExpClick={tSuprActExpClick}
          tTRdioIcn={tTRdioIcn}
          tTRdioClr={tTRdioClr}
          tToglValue={tToglValue}
          tToglClick={tToglClick}
          tTrailClick={tTrailClick}
          lLRdio={lLRdio}
          lLRdioIcn={lLRdioIcn}
          lLRdioClr={lLRdioClr}
          lLRdioSz={lLRdioSz}
          lLRdioClick={lLRdioClick}
          tTRdioSz={tTRdioSz}
          tTDiv={tTDiv}
          tTIcnClr={tTIcnClr}
          tTIcnSz={tTIcnSz}
          tSuprActExpTxtSrc={tSuprActExpTxtSrc}
          tSuprActExpIcnSrc={tSuprActExpIcnSrc}
          tBdg={tBdg}
          tBdgTxtSrc={tBdgTxtSrc}
          tBdgClr={tBdgClr}
          tTRdioClick={tTRdioClick}
          lAvtrBdgSz={lAvtrBdgSz}
        />
      )}
    </_Component>
  ) : null;
}
