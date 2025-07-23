"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecClip.module.css";

export function SecClip({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  stats = false,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "offer",
  secHeadTitleSrc = "Clips",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conSideFade = true,
  conCellMap,
  conSlotId = "off-clip",
  conCellExample = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizSz = "l",
  exampleVizAsp = "1-1",
  exampleCapt = true,
  exampleCaptTitleSrc = "$0.00 Off",
  exampleTypeSrc = "in store",
  exampleLimitSrc = "limit 2",
  exampleExpSrc = "ends in 2d",
  exampleCellSz = "5xl",
  exampleCellCard = "true",
  exampleCellClick = {},
  exampleEmpty = false,
  exampleEmptyIcnSrc = "percent_off",
  exampleEmptyHlineSrc = "Look For Deals",
  exampleEmptySubTxtSrc = "Grab yourself a special offer",
  exampleEmptyCtaTxtSrc = "Let's See Them",
  exampleEmptyClick = {},
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-clip")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1={secHeadAct1}
        secHead={secHead}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
      />
      <BarSs
        barMap={conCellMap}
        sideFade={conSideFade}
        empty={exampleEmpty}
        emptyIcnSrc={exampleEmptyIcnSrc}
        emptyHlineSrc={exampleEmptyHlineSrc}
        emptySubTxtSrc={exampleEmptySubTxtSrc}
        emptyCtaTxtSrc={exampleEmptyCtaTxtSrc}
        emptyClick={exampleEmptyClick}
        slotId={conSlotId}
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
