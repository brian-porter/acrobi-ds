"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecEvent.module.css";

export function SecEvent({
  as: _Component = _Builtin.Block,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Events",
  secHeadAct1TxtSrc = "Add",
  secHeadAct1Click = {},
  conSideFade = false,
  conCellMap,
  conExampleCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizAsp = "16-9",
  exampleVizSz = "5xl",
  exampleCapt = true,
  exampleTitleSrc = "EventTitle",
  exampleSubtxtSrc = "EventSubtxt supporting content",
  exampleAtrbNameSrc = "BrandName",
  exampleRTxtSrc = "in {time}",
  exampleCellSz = "5xl",
  exampleCellCard,
  exampleActClick = {},
  exampleCellClick = {},
  stats = false,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
  emptyEmpty = true,
  emptyEmptyIcnSrc = "cal",
  emptyEmptyHlineSrc = "No Events Scheduled",
  emptyEmptySubTxtSrc = "Set up an event and next time it will be listed here",
  emptyEmptyCtaTxtSrc = "Add Event",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component className={_utils.cx(_styles, "sec-events")} tag="div">
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
      <BarSs
        barMap={conCellMap}
        empty={emptyEmpty}
        sideFade={conSideFade}
        emptyIcnSrc={emptyEmptyIcnSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptyClick={emptyEmptyClick}
      />
      <StatsBar
        stat3={stat3}
        stat4={stat4}
        stats={stats}
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat2={stat2}
      />
    </_Component>
  ) : null;
}
