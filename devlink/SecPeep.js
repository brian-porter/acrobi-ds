"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecPeep.module.css";

export function SecPeep({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "member",
  secHeadTitleSrc = "Peeps",
  secHeadAct1TxtSrc = "Cancel",
  secHeadAct1Click = {},
  conSideFade = true,
  conCellMap,
  conSlotId = "peep-con",
  conExampleCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizSz = "l",
  exampleCapt = true,
  exampleCaptSubtxt = true,
  exampleTitleSrc = "FName LI",
  exampleSubtxtSrc = "@handle",
  exampleCellSz = "auto",
  exampleCellCard,
  exampleCellClick = {},
  exampleBtn = true,
  exampleBtnTxtSrc = "Connect",
  exampleBtnIcnSrc = "addcircle",
  exampleBtnStyl = "pl",
  exampleBtnDis = "false",
  exampleBtnClick = {},
  stats = true,
  stat1Src = "3 connections",
  stat2Src = "24 community",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
  emptyEmpty = false,
  emptyEmptyIcnSrc = "default",
  emptyEmptyHlineSrc = "Headline",
  emptyEmptySubTxtSrc = "Subhead description below",
  emptyEmptyCtaTxtSrc = "CTA Wording",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-peep")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        act1={secHeadAct1}
        titleSrc={secHeadTitleSrc}
        titleIcnSrc={secHeadTitleIcnSrc}
        titleIcn={secHeadTitleIcn}
        secHead={secHead}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        titleSz="r1"
      />
      <BarSs
        barMap={conCellMap}
        empty={emptyEmpty}
        emptyClick={emptyEmptyClick}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptyIcnSrc={emptyEmptyIcnSrc}
        slotId={conSlotId}
        sideFade={conSideFade}
      />
      <StatsBar
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat4={stat4}
        stat3={stat3}
        stats={stats}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat2={stat2}
      />
    </_Component>
  ) : null;
}
