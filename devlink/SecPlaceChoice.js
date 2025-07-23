"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { PlaceChoiceSs } from "./PlaceChoiceSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecPlaceChoice.module.css";

export function SecPlaceChoice({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "location",
  secHeadTitleSrc = "Location",
  secHeadAct1TxtSrc = "Add",
  secHeadAct1Click = {},
  conSideFade = true,
  conCellMap,
  conExampleCell = true,
  exampleCellActv = false,
  exampleVizSrc = "home",
  exampleVizSz = "l",
  exampleVizClr = "n500",
  exampleCapt = true,
  exampleCaptTitleSrc = "PlaceName",
  exampleCaptSubtxtSrc = "address",
  exampleCaptSub2Src = "city, {ST} zip",
  exampleCellSz = "3xl",
  exampleCellCard = "true",
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
  emptyEmptyIcnSrc = "geo_myloc",
  emptyEmptyHlineSrc = "Find Me",
  emptyEmptySubTxtSrc = "Locate the address you're at now",
  emptyEmptyCtaTxtSrc = "Ok, Let's Do It",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-place")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        secHead={secHead}
        act1={secHeadAct1}
        act1Click={secHeadAct1Click}
        titleIcnSz="s"
        titleIcnClr="n700"
      />
      <PlaceChoiceSs
        exampleCellActv={exampleCellActv}
        sideFade={conSideFade}
        cellMap={conCellMap}
        cellExample={conExampleCell}
        exampleVizSrc={exampleVizSrc}
        exampleVizSz={exampleVizSz}
        exampleVizClr={exampleVizClr}
        exampleCapt={exampleCapt}
        exampleCaptTitleSrc={exampleCaptTitleSrc}
        exampleCaptSubtxtSrc={exampleCaptSubtxtSrc}
        exampleCaptSub2Src={exampleCaptSub2Src}
        exampleCellSz={exampleCellSz}
        exampleCellCard={exampleCellCard}
        exampleCellClick={exampleCellClick}
        emptyEmpty={emptyEmpty}
        emptyIcnSrc={emptyEmptyIcnSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptyEmptyClick={emptyEmptyClick}
      />
      <StatsBar
        stats={stats}
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat4={stat4}
        stat3={stat3}
        stat2={stat2}
      />
    </_Component>
  ) : null;
}
