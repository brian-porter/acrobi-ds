"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecBrand.module.css";

export function SecBrand({
  as: _Component = _Builtin.Block,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "brand",
  secHeadTitleSrc = "Brands",
  conSideFade = false,
  conCellMap,
  conExampleCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizSz = "2xl",
  exampleVizAsp = "1-1",
  exampleCapt = true,
  exampleCaptSubtxt = false,
  exampleTitleSrc = "BrandName",
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
  secHeadAct1TxtSrc = "Cancel",
  secHeadAct1Click = {},
  stats = false,
  stat1Src = "stat1",
  stat2Src = "stat2",
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
  slotId = "brand-con",
}) {
  return sec ? (
    <_Component className={_utils.cx(_styles, "sec-brand")} tag="div">
      <SecHead
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        act1={secHeadAct1}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
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
        slotId={slotId}
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
