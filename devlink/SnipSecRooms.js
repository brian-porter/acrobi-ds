"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmContent } from "./ListItmContent";
import { StatsBar } from "./StatsBar";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./SnipSecRooms.module.css";

export function SnipSecRooms({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = false,
  secHeadTitleIcn = true,
  secHeadAct1 = true,
  secHeadAct1Icn = true,
  secHeadAct1Txt = false,
  secHeadTitleIcnSrc = "room",
  secHeadTitleSrc = "Rooms",
  secHeadAct1IcnSrc = "Add",
  secHeadAct1TxtSrc = "Add",
  secHeadAct1Click = {},
  conSec1Map,
  conExampleSec1Room = true,
  exampleSec1VizSrc = "default",
  exampleSec1TitleSrc = "{RoomName}",
  exampleSec1Subtxt1Src = "description of the room here",
  exampleSec1CellClick = {},
  stat1Src = "{XXX} messages",
  stats = true,
  stat2Src = "{X} likes",
  stat3Src = "{XX} peeps",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "room-sec")}
      tag="section"
      grid={{
        type: "section",
      }}
    >
      <SecHead
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1Txt={secHeadAct1Txt}
        act1Icn={secHeadAct1Icn}
        act1IcnSrc={secHeadAct1IcnSrc}
        secHead={secHead}
        subtxt={false}
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        <SecHead
          act1Click={secHeadAct1Click}
          act1={secHeadAct1}
          titleSrc="Rooms"
          act1TxtSrc="Add"
          subtxt={false}
          sz="m"
          titleIcn={true}
          titleIcnSrc="room"
          act1Txt={false}
          act1Icn={true}
          act1IcnSrc="Add"
        />
        <_Builtin.List
          className={_utils.cx(_styles, "list_wrap")}
          tag="ul"
          unstyled={true}
        >
          {conSec1Map ?? (
            <ListItmContent
              listItm={conExampleSec1Room}
              lIcnSrc={exampleSec1VizSrc}
              pTitleSrc={exampleSec1TitleSrc}
              pSubtxt1Src={exampleSec1Subtxt1Src}
              listItmClick={exampleSec1CellClick}
              lIcnL={true}
              lAvtr={false}
              lAdptIcn={false}
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
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
              tActLbl1TxtSrc="{#missed}"
              tActLbl2={false}
              tActLbl1Icn={false}
            />
          )}
        </_Builtin.List>
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
        <Spacer szDep="16" size="16" />
      </_Builtin.Block>
      <Spacer szDep="16" size="16" />
    </_Component>
  ) : null;
}
