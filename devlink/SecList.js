"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecList.module.css";

export function SecList({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadAct1Icn = false,
  secHeadAct1Txt = true,
  secHeadTitleIcnSrc = "list",
  secHeadTitleSrc = "Lists",
  secHeadAct1IcnSrc = "default",
  secHeadAct1TxtSrc = "Cancel",
  secHeadAct1Click = {},
  conSideFade = true,
  conCellMap,
  conSlotId = "list",
  conCellExample = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizAsp = "16-9",
  exampleVizSz = "3xl",
  exampleBnr = true,
  exampleBnrIcnSrc = "Default",
  exampleBnrTxtSrc = "ListName",
  exampleCapt = false,
  exampleTitleSrc = "ListName",
  exampleCellSz = "3xl",
  exampleCellCard,
  exampleCellClick = {},
  stats = false,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
  emptyEmpty = false,
  emptyEmptyIcnSrc = "list",
  emptyEmptyHlineSrc = "No Lists Found",
  emptyEmptySubTxtSrc = "Create a list for almost anything",
  emptyEmptyCtaTxtSrc = "Add List",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "list-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        act1Txt={secHeadAct1Txt}
        act1Icn={secHeadAct1Icn}
        act1IcnSrc={secHeadAct1IcnSrc}
      />
      <BarSs
        barMap={conCellMap}
        empty={emptyEmpty}
        sideFade={conSideFade}
        emptyIcnSrc={emptyEmptyIcnSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptyClick={emptyEmptyClick}
        slotId={conSlotId}
      />
      <StatsBar
        stats={stats}
        stat1Src={stat1Src}
        stat3={stat3}
        stat4={stat4}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat2={stat2}
      />
    </_Component>
  ) : null;
}
