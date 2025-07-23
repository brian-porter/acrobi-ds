"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmContent } from "./ListItmContent";
import { BarSs } from "./BarSs";
import { SecActivity } from "./SecActivity";
import { StatsBar } from "./StatsBar";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./SnipSecRank.module.css";

export function SnipSecRank({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  stats = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "rank",
  secHeadTitleSrc = "Rank & Rewards",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conRankVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  conRankVizAlt = "__wf_reserved_inherit",
  conRankTitleSrc = "{RankName}",
  conRankYrSrc = "{year} status",
  conRankEstYrSrc = "est {month} {year}",
  conRankPtsSrc = "pts {point-amt}",
  conSec1Map,
  conExampleCellAchievement = true,
  conActvMap,
  conExampleCellActvItm = true,
  exSec1Sec1Sec = true,
  exSec1Sec1SecHead = true,
  exSec1Sec1AdptIcnSrc = "Default",
  exSec1Sec1AdptBgClr = "n500",
  exSec1Sec1AdptShape = "r",
  exSec1Sec1AdptSz = "l",
  exSec1Sec1TitleSrc = "Achievement Name Here",
  exSec1Sec1CellClick = {},
  exActvActvSec = true,
  exActvActvSecHead = true,
  exActvActvHeadTitleIcn = false,
  exActvActvHeadAct1 = false,
  exActvActvHeadTitleIcnSrc = "default",
  exActvActvHeadTitleSrc = "Activity",
  exActvActvHeadAct1TxtSrc = "Edit",
  exActvActvHeadAct1Click = {},
  exActvActvVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exActvActvVizAlt = "__wf_reserved_inherit",
  exActvActvTitleSrc = "{ActivityName}",
  exActvActvSubtxtSrc = "{XXX} pts",
  exActvActvRTxtSrc = "{time}",
  stat1Src = "{XXX} total pts",
  stat2Src = "stat2",
  stat3Src = "stat3",
  exActvActvAct = false,
  exActvActvActClick = {},
  exActvActvClick = {},
  stat4Src = "stat4",
  stat2 = false,
  stat3 = false,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "rank-sec")}
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
        subtxt={false}
        subtxtSrc="Earn status within the community"
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        <_Builtin.List
          className={_utils.cx(_styles, "list_wrap")}
          tag="ul"
          unstyled={true}
        >
          <ListItmContent
            pTitleSrc={conRankTitleSrc}
            lImgSrc={conRankVizSrc}
            pSubtxt1Src={conRankYrSrc}
            tActLbl1TxtSrc={conRankEstYrSrc}
            tActLbl2TxtSrc={conRankPtsSrc}
            lImgAlt={conRankVizAlt}
            lIcnL={false}
            lImg={true}
            lAvtr={false}
            lAdptIcn={false}
            lIcnSrc="default"
            tBtn={false}
            tSuprAct={false}
            tTRdio={false}
            tTogl={false}
            listItm={true}
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
            tActLbl1Txt={true}
            tTIcnSrc="Moreh"
            tActLbl1Icn={false}
            tAct={true}
          />
        </_Builtin.List>
        {exSec1Sec1Sec ? (
          <_Builtin.Block className={_utils.cx(_styles, "sec-ach")} tag="div">
            <SecHead
              secHead={exSec1Sec1SecHead}
              titleSrc="Achievements"
              sz="s"
              act1TxtSrc="Edit"
              act1={false}
              titleClr="n500"
            />
            <BarSs barMap={conSec1Map} />
          </_Builtin.Block>
        ) : null}
        <SecActivity
          sec={exActvActvSec}
          exampleCellClick={exActvActvClick}
          conListMap={conActvMap}
          conExampleListItm={conExampleCellActvItm}
          exampleVizSrc={exActvActvVizSrc}
          exampleTitleSrc={exActvActvTitleSrc}
          exampleSubtxtSrc={exActvActvSubtxtSrc}
          exampleTimeSrc={exActvActvRTxtSrc}
          secHead={exActvActvSecHead}
          secHeadTitleIcn={exActvActvHeadTitleIcn}
          secHeadAct1={exActvActvHeadAct1}
          secHeadTitleIcnSrc={exActvActvHeadTitleIcnSrc}
          secHeadTitleSrc={exActvActvHeadTitleSrc}
          secHeadAct1TxtSrc={exActvActvHeadAct1TxtSrc}
          secHeadAct1Click={exActvActvHeadAct1Click}
          exampleVizAlt={exActvActvVizAlt}
          exampleAct={exActvActvAct}
          exampleActClick={exActvActvActClick}
        />
        <StatsBar
          stat1Src={stat1Src}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stat2={stat2}
          stat3={stat3}
          stat4={stat4}
          stats={stats}
          stat4Src={stat4Src}
        />
      </_Builtin.Block>
      <Spacer szDep="24" size="24" />
    </_Component>
  ) : null;
}
