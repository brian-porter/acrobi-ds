"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecVideo.module.css";

export function SecVideo({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  stats = false,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadAct1Icn = false,
  secHeadAct1Txt = true,
  secHeadTitleIcnSrc = "vid",
  secHeadTitleSrc = "Videos",
  secHeadAct1IcnSrc = "Moreh",
  secHeadAct1TxtSrc = "More",
  secHeadAct1Click = {},
  conSideFade = false,
  conCellMap,
  conExampleCell = true,
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
      className={_utils.cx(_styles, "sec-vid")}
      tag="section"
      grid={{
        type: "section",
      }}
    >
      <SecHead
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleSrc={secHeadTitleSrc}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        secHead={secHead}
        act1IcnSrc={secHeadAct1IcnSrc}
        act1Txt={secHeadAct1Txt}
        act1Icn={secHeadAct1Icn}
      />
      <BarSs barMap={conCellMap} sideFade={conSideFade} />
      <StatsBar
        stats={stats}
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat3={stat3}
        stat4={stat4}
        stat2={stat2}
      />
    </_Component>
  ) : null;
}
