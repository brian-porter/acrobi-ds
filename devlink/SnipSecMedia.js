"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecMedia.module.css";

export function SnipSecMedia({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = false,
  stats = true,
  secHeadTitleIcn = true,
  secHeadAct1 = true,
  secHeadAct1Icn = true,
  secHeadAct1Txt = false,
  secHeadTitleIcnSrc = "gal",
  secHeadTitleSrc = "Media Gallery",
  secHeadAct1IcnSrc = "Add",
  secHeadAct1TxtSrc = "Add",
  secHeadAct1Click = {},
  conSec1HeadAct1 = true,
  conSec1HeadAct1Click = {},
  conSec1Map,
  conExampleCellMedia = true,
  exampleSec1VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleSec1VizAlt = "__wf_reserved_inherit",
  exampleSec1CaptLTxtSrc = "location",
  exampleSec1CaptRTxtSrc = "{time}",
  exampleSec1CellClick = {},
  stat1Src = "{XXX} photos",
  stat2Src = "{X} videos",
  stat3Src = "{XX} peeps",
  emptyEmpty = false,
  emptyEmptyIcnSrc = "ed_img",
  emptyEmptyHlineSrc = "No Media Found",
  emptyEmptySubTxtSrc = "Capture the moment and upload",
  emptyEmptyCtaTxtSrc = "Add Photo/Video",
  emptyEmptyClick = {},
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "media-sec")}
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
          act1Click={conSec1HeadAct1Click}
          act1={conSec1HeadAct1}
          titleSrc="Media Gallery"
          act1TxtSrc="Add"
          sz="m"
          titleIcn={true}
          titleIcnSrc="gal"
          act1IcnSrc="Add"
          act1Icn={true}
          act1Txt={false}
        />
        <Spacer szDep="16" size="16" />
        <BarSs
          barMap={conSec1Map}
          empty={emptyEmpty}
          emptyIcnSrc={emptyEmptyIcnSrc}
          emptyHlineSrc={emptyEmptyHlineSrc}
          emptySubTxtSrc={emptyEmptySubTxtSrc}
          emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
          emptyClick={emptyEmptyClick}
        />
        <StatsBar
          stat1Src={stat1Src}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stats={stats}
          stat2={stat2}
          stat3={stat3}
          stat4={stat4}
          stat4Src={stat4Src}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
