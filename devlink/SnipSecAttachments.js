"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { SecList } from "./SecList";
import { Spacer } from "./Spacer";
import { SecPlace } from "./SecPlace";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecAttachments.module.css";

export function SnipSecAttachments({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = false,
  secHeadTitleIcn = true,
  secHeadAct1 = true,
  secHeadAct1Icn = true,
  secHeadAct1Txt = false,
  secHeadTitleIcnSrc = "attach",
  secHeadTitleSrc = "Attachments",
  secHeadAct1IcnSrc = "Add",
  secHeadAct1TxtSrc = "Add",
  secHeadAct1Click = {},
  conSec1Map,
  conExampleSec1Lists = true,
  conSec2Map,
  conExampleSec2Place = true,
  exSec1Sec1VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exSec1Sec1VizAlt = "__wf_reserved_inherit",
  exSec1Sec1TitleSrc = "ListName",
  exSec1Sec1CellClick = {},
  exSec2Sec2VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exSec2Sec2VizAlt = "__wf_reserved_inherit",
  exSec2Sec2TitleSrc = "PlaceName",
  exSec2Sec2CellClick = {},
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stats = true,
  stat4Src = "stat4",
  stat2 = false,
  stat3 = false,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "atch-sec")}
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
        act1IcnSrc={secHeadAct1IcnSrc}
        act1Icn={secHeadAct1Icn}
        act1Txt={secHeadAct1Txt}
        secHead={secHead}
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
          titleSrc="Attachments"
          act1TxtSrc="Add"
          sz="m"
          titleIcn={true}
          titleIcnSrc="attach"
          act1IcnSrc="Add"
          act1Icn={true}
          act1Txt={false}
        />
        <SecList
          conCellMap={conSec1Map}
          conCellExample={conExampleSec1Lists}
          exampleVizSrc={exSec1Sec1VizSrc}
          exampleVizAlt={exSec1Sec1VizAlt}
          exampleTitleSrc={exSec1Sec1TitleSrc}
          exampleCellClick={exSec1Sec1CellClick}
          exampleVizSz="4xl"
          exampleCellSz="4xl"
          exampleCellCard=""
        />
        <Spacer szDep="16" size="16" />
        <SecPlace
          conCellMap={conSec2Map}
          conExampleCellPlace={conExampleSec2Place}
          exampleVizSrc={exSec2Sec2VizSrc}
          exampleVizAlt={exSec2Sec2VizAlt}
          exampleCaptTitleSrc={exSec2Sec2TitleSrc}
          exampleCellClick={exSec2Sec2CellClick}
          emptyEmpty={false}
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
      <Spacer szDep="16" size="16" />
    </_Component>
  ) : null;
}
