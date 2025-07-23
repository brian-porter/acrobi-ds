"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmContent } from "./ListItmContent";
import { SecPeep } from "./SecPeep";
import { Spacer } from "./Spacer";
import { SecGroup } from "./SecGroup";
import { SecActivity } from "./SecActivity";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecPeep.module.css";

export function SnipSecPeep({
  as: _Component = _Builtin.Section,
  sec = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  conPerson = true,
  conBrand = false,
  conAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  conAvtrAlt = "__wf_reserved_inherit",
  conNameSrc = "{Name}'s",
  conSec1Map,
  conExampleSec1Connection = true,
  conSec2Map,
  conExampleSec2Group = true,
  conActvMap,
  secHead = true,
  exSec1Sec1Sec = true,
  exSec1Sec1VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exSec1Sec1VizAlt = "__wf_reserved_inherit",
  exSec1Sec1TitleSrc = "FName",
  exSec1Sec1CellClick = {},
  exSec1Sec1Stat1Src = "{X} family",
  exSec1Sec1Stat2Src = "{X} friends",
  exSec1Sec1Stat3Src = "{X} overall",
  exSec2Sec2Sec = true,
  exSec2Sec2SecHead = true,
  exSec2Sec2VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exSec2Sec2VizAlt = "__wf_reserved_inherit",
  exSec2Sec2BnrAvtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exSec2Sec2BnrAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exSec2Sec2BnrAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exSec2Sec2BnrAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exSec2Sec2BnrAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exSec2Sec2BnrAvtr2 = false,
  exSec2Sec2BnrAvtr3 = false,
  exSec2Sec2BnrAvtr4 = false,
  exSec2Sec2BnrAvtr5 = false,
  exSec2Sec2QtySrc = "123",
  exSec2Sec2TitleSrc = "GroupName",
  exSec2Sec2CellClick = {},
  exActvActvSec = true,
  exActvActvSecHead = true,
  exActvActvVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  stat1Src = "{XXX} total pts",
  secHeadTitleIcnSrc = "peep",
  secHeadTitleSrc = "Peeps",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conExampleActvItm = true,
  exActvActvVizAlt = "__wf_reserved_inherit",
  exActvActvTitleSrc = "{ItemName}",
  exActvActvSubtxtSrc = "{ListType}",
  exActvActvRTxtSrc = "{time}",
  exActvActvAct = true,
  exActvActvActClick = {},
  exActvActvCellClick = {},
  stats = true,
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = false,
  stat3 = false,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "peep-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        {exSec1Sec1Sec ? (
          <_Builtin.Block className={_utils.cx(_styles, "sec1")} tag="div">
            <_Builtin.List
              className={_utils.cx(_styles, "list_wrap")}
              tag="ul"
              unstyled={true}
            >
              <ListItmContent
                pTitleSrc={conNameSrc}
                listItm={conPerson}
                lAvtrSrc={conAvtrSrc}
                lAvtrAlt={conAvtrAlt}
                lIcnL={false}
                lImg={false}
                lAvtr={true}
                lAdptIcn={false}
                lIcnSrc="default"
                tBtn={false}
                tSuprAct={false}
                tTRdio={false}
                tTogl={false}
                lIcnClr="p500"
                lIcnSz="s"
                lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                lImgAlt="__wf_reserved_inherit"
                lImgSz="l"
                lAvtrSz="l"
                lAdptIcnSrc="Default"
                lAdptSz="m"
                lAdptBgClr="n500"
                lLDiv=""
                pTitleSubtxt={true}
                pTitleSz="r2"
                pTitleClr="n900"
                pSubtxt1={true}
                pSubtxt2={false}
                pSubtxt1Src="recent connections"
                pSubtxt2Src="Subtext2"
                pSubtxt1Sz="r3"
                pSubtxt2Sz="r3"
                pSubtxt1Clr="n700"
                pSubtxt2Clr="n700"
                pPDiv="y"
                tActLbl1Txt={true}
                tTIcnSrc="Moreh"
                tActLbl1Icn={false}
                tActLbl1TxtSrc="est {year}"
                tActLbl2TxtSrc="pts {point-amt}"
              />
              <ListItmContent
                pTitleSrc={conNameSrc}
                listItm={conBrand}
                lAvtrSrc={conAvtrSrc}
                lAvtrAlt={conAvtrAlt}
                lIcnL={false}
                lImg={false}
                lAvtr={true}
                lAdptIcn={false}
                lIcnSrc="default"
                tBtn={false}
                tSuprAct={false}
                tTRdio={false}
                tTogl={false}
                lIcnClr="p500"
                lIcnSz="s"
                lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                lImgAlt="__wf_reserved_inherit"
                lImgSz="l"
                lAvtrSz="l"
                lAdptIcnSrc="Default"
                lAdptSz="m"
                lAdptBgClr="n500"
                lLDiv=""
                pTitleSubtxt={true}
                pTitleSz="r2"
                pTitleClr="n900"
                pSubtxt1={true}
                pSubtxt2={false}
                pSubtxt1Src="top contributors"
                pSubtxt2Src="Subtext2"
                pSubtxt1Sz="r3"
                pSubtxt2Sz="r3"
                pSubtxt1Clr="n700"
                pSubtxt2Clr="n700"
                pPDiv="y"
                tActLbl1Txt={true}
                tTIcnSrc="Moreh"
                tActLbl1Icn={false}
                tActLbl1TxtSrc="est {year}"
                tActLbl2TxtSrc="pts {point-amt}"
                lAvtrShape="r"
              />
            </_Builtin.List>
            <SecPeep
              exampleTitleSrc={exSec1Sec1TitleSrc}
              stat1Src={exSec1Sec1Stat1Src}
              stat2Src={exSec1Sec1Stat2Src}
              stat3Src={exSec1Sec1Stat3Src}
              conCellMap={conSec1Map}
              conExampleCell={conExampleSec1Connection}
              exampleVizSrc={exSec1Sec1VizSrc}
              exampleVizAlt={exSec1Sec1VizAlt}
              exampleCellClick={exSec1Sec1CellClick}
              secHead={false}
              exampleCaptSubtxt={false}
              exampleBtn={false}
              stat3={true}
            />
          </_Builtin.Block>
        ) : null}
        <Spacer size="16" />
        <SecGroup
          conCellMap={conSec2Map}
          exampleVizSrc={exSec2Sec2VizSrc}
          exampleVizAlt={exSec2Sec2VizAlt}
          exampleBnrAvtr1Src={exSec2Sec2BnrAvtr1Src}
          exampleQtySrc={exSec2Sec2QtySrc}
          exampleTitleSrc={exSec2Sec2TitleSrc}
          emptyEmptyClick={exSec2Sec2CellClick}
          exampleBnrAvtr2={exSec2Sec2BnrAvtr2}
          exampleBnrAvtr3={exSec2Sec2BnrAvtr3}
          exampleBnrAvtr4={exSec2Sec2BnrAvtr4}
          exampleBnrAvtr5={exSec2Sec2BnrAvtr5}
          exampleBnrAvtr2Src={exSec2Sec2BnrAvtr2Src}
          exampleBnrAvtr3Src={exSec2Sec2BnrAvtr3Src}
          exampleBnrAvtr4Src={exSec2Sec2BnrAvtr4Src}
          exampleBnrAvtr5Src={exSec2Sec2BnrAvtr5Src}
          sec={exSec2Sec2Sec}
          secHead={exSec2Sec2SecHead}
        />
        <Spacer size="16" />
        <SecActivity
          sec={exActvActvSec}
          exampleVizSrc={exActvActvVizSrc}
          secHead={exActvActvSecHead}
          conListMap={conActvMap}
          conExampleListItm={conExampleActvItm}
          exampleVizAlt={exActvActvVizAlt}
          exampleTitleSrc={exActvActvTitleSrc}
          exampleSubtxtSrc={exActvActvSubtxtSrc}
          exampleTimeSrc={exActvActvRTxtSrc}
          exampleAct={exActvActvAct}
          exampleActClick={exActvActvActClick}
          exampleCellClick={exActvActvCellClick}
        />
        <StatsBar
          stat1Src={stat1Src}
          stat2={stat2}
          stat3={stat3}
          stat4={stat4}
          stats={stats}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stat4Src={stat4Src}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
