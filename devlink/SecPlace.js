"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecPlace.module.css";

export function SecPlace({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  stats = false,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadAct1Txt = true,
  secHeadAct1Icn = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Places",
  secHeadAct1IcnSrc = "default",
  secHeadAct1TxtSrc = "Edit",
  secHeadAct1Click = {},
  conCellMap,
  conExampleCellPlace = true,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleCaptTitleSrc = "PlaceName",
  exampleCellClick = {},
  emptyEmpty = true,
  emptyEmptyIcnSrc = "place",
  emptyEmptyHlineSrc = "No Places Found",
  emptyEmptySubTxtSrc = "Attach a location to link",
  emptyEmptyCtaTxtSrc = "Add Place",
  emptyEmptyClick = {},
  conSideFade = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "fav-place-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        act1Txt={secHeadAct1Txt}
        act1Icn={secHeadAct1Icn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1IcnSrc={secHeadAct1IcnSrc}
        act1Click={secHeadAct1Click}
        sz="s"
        titleClr="n500"
      />
      <BarSs
        emptyIcnSrc={emptyEmptyIcnSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        barMap={conCellMap}
        empty={emptyEmpty}
        emptyClick={emptyEmptyClick}
        sideFade={conSideFade}
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
