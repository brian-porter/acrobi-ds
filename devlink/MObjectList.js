"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { EmptyCollection } from "./EmptyCollection";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./MObjectList.module.css";

export function MObjectList({
  as: _Component = _Builtin.Block,
  objectList = true,
  objTitleSrc = "ObjectTitle",
  closeClick = {},
  objCellMap,
  objCellExample = true,
  listItmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  listItmImgAlt = "__wf_reserved_inherit",
  listItmTitleSrc = "ListItemTitle goes here with a line wrap for two lines blah blah blah",
  listItmClick = {},
  gttrBdg = false,
  gttrBdgPin = false,
  gttrBdgAlarm = false,
  gttrBdgBkmrk = false,
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
  lAvtrSz = "m",
  lAvtrBdg = false,
  lAvtrBdgClr = "fd500",
  lAvtrBdgSz = "m",
  lAdptIcnSrc = "Default",
  lAdptSz = "m",
  lAdptBgClr = "n500",
  lLDiv,
  lLRdioIcn = "rdio_off",
  lLRdioClr = "n300",
  lLRdioSz = "m",
  lLRdioClick = {},
  pTitleSubtxt = true,
  pMsg = false,
  pTitleSrc = "ItmTitle",
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
  tAct = false,
  tTIcn = false,
  tBtn = false,
  tSuprAct = false,
  tTRdio = false,
  tTogl = false,
  tBdg = false,
}) {
  return objectList ? (
    <_Component className={_utils.cx(_styles, "g-obj-list")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "g-objectlist")}
        tag="section"
        mini=""
      >
        <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
          <SecHead
            titleSrc={objTitleSrc}
            act1Click={closeClick}
            sz="xl"
            act1={true}
            titleSz="h4"
            act1TxtSrc="Close"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "a-sheetbody")} tag="div">
          <EmptyCollection
            empty={false}
            headlineSrc=""
            primeBtnTxtSrc=""
            icnSrc=""
            subtxtSrc=""
            btmDoc={false}
          />
          <_Builtin.Grid className={_utils.cx(_styles, "sheet-grid")} tag="div">
            {objCellMap ?? <Cell />}
          </_Builtin.Grid>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
