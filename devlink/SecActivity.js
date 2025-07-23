"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmContent } from "./ListItmContent";
import * as _utils from "./utils";
import _styles from "./SecActivity.module.css";

export function SecActivity({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Activity",
  secHeadAct1TxtSrc = "Edit",
  secHeadAct1Click = {},
  conListMap,
  conExampleListItm = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleTitleSrc = "{ItemName}",
  exampleSubtxtSrc = "{ListType}",
  exampleTimeSrc = "{time}",
  exampleAct = true,
  exampleActClick = {},
  exampleCellClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "actv-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1Click={secHeadAct1Click}
        sz="s"
      />
      <_Builtin.List
        className={_utils.cx(_styles, "list_wrap")}
        tag="ul"
        unstyled={true}
      >
        {conListMap ?? (
          <>
            <ListItmContent
              pTitleSrc={exampleTitleSrc}
              lImgSrc={exampleVizSrc}
              pSubtxt1Src={exampleSubtxtSrc}
              listItm={conExampleListItm}
              lImgAlt={exampleVizAlt}
              tTrailClick={exampleActClick}
              tActLbl1Icn={exampleAct}
              tActLbl2TxtSrc={exampleTimeSrc}
              lIcnL={false}
              lAvtr={false}
              lAdptIcn={false}
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={true}
              pSubtxt2={false}
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
              tTIcnSrc="Moreh"
              tActLbl2={true}
              lImg={true}
              tAct={true}
              tActLbl1IcnSrc="addcirc"
              tActLbl1Sz="r1"
              tActLbl1Clr="p500"
              pPClick={{}}
              tActLbl2Txt={true}
            />
            <ListItmContent
              pTitleSrc={exampleTitleSrc}
              lImgSrc={exampleVizSrc}
              pSubtxt1Src={exampleSubtxtSrc}
              listItm={conExampleListItm}
              lImgAlt={exampleVizAlt}
              tTrailClick={exampleActClick}
              tActLbl1Icn={exampleAct}
              tActLbl2TxtSrc={exampleTimeSrc}
              lIcnL={false}
              lAvtr={false}
              lAdptIcn={false}
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={true}
              pSubtxt2={false}
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
              tTIcnSrc="Moreh"
              tActLbl2={true}
              lImg={true}
              tAct={true}
              tActLbl1IcnSrc="addcirc"
              tActLbl1Sz="r1"
              tActLbl1Clr="p500"
              pPClick={{}}
              tActLbl2Txt={true}
            />
            <ListItmContent
              pTitleSrc={exampleTitleSrc}
              lImgSrc={exampleVizSrc}
              pSubtxt1Src={exampleSubtxtSrc}
              listItm={conExampleListItm}
              lImgAlt={exampleVizAlt}
              tTrailClick={exampleActClick}
              tActLbl1Icn={exampleAct}
              tActLbl2TxtSrc={exampleTimeSrc}
              lIcnL={false}
              lAvtr={false}
              lAdptIcn={false}
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={true}
              pSubtxt2={false}
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
              tTIcnSrc="Moreh"
              tActLbl2={true}
              lImg={true}
              tAct={true}
              tActLbl1IcnSrc="addcirc"
              tActLbl1Sz="r1"
              tActLbl1Clr="p500"
              pPClick={{}}
              tActLbl2Txt={true}
            />
          </>
        )}
      </_Builtin.List>
    </_Component>
  ) : null;
}
