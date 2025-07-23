"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { CardPeepData } from "./CardPeepData";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecPeepCard.module.css";

export function SecPeepCard({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "flash_on",
  secHeadTitleSrc = "Activity",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conSideFade = false,
  conCellMap,
  conExampleCell = true,
  stats = false,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = true,
  emptyEmpty = false,
  emptyEmptyIcnSrc = "member",
  emptyEmptyHlineSrc = "Nothing Found",
  emptyEmptySubTxtSrc = "Connect with people or join a group",
  emptyEmptyCtaTxtSrc = "Find Friends",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "peepcard-sec")}
      tag="section"
      grid={{
        type: "section",
      }}
    >
      <SecHead
        titleIcnSrc={secHeadTitleIcnSrc}
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        act1={secHeadAct1}
        secHead={secHead}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        titleIcnClr="n500"
      />
      {conExampleCell ? (
        <_Builtin.Block className={_utils.cx(_styles, "example-ss")} tag="div">
          <CardPeepData />
        </_Builtin.Block>
      ) : null}
      <BarSs
        barMap={conCellMap}
        sideFade={conSideFade}
        empty={emptyEmpty}
        emptyIcnSrc={emptyEmptyIcnSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyClick={emptyEmptyClick}
        slotId="obj-data"
      />
      <StatsBar
        stats={stats}
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat2={stat2}
        stat3={stat3}
        stat4={stat4}
      />
    </_Component>
  ) : null;
}
