"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecOffer.module.css";

export function SecOffer({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  conSideFade = false,
  conCellMap,
  conSlotId = "prod-off",
  conExampleCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizSz = "3xl",
  exampleCapt = true,
  exampleNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  exampleHookSrc = "$0.00 Off",
  exampleByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleTypeSrc = "in store",
  exampleLimitSrc = "limit 2",
  exampleCellSz = "3xl",
  exampleCellCard,
  exampleActClick = {},
  exampleCellClick = {},
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "offer",
  secHeadTitleSrc = "Top Product Offers",
  secHeadTitleSz = "r2",
  secHeadTitleClr = "in",
  secHeadAct1TxtSrc = "See All",
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
  emptyEmptyIcnSrc = "offer",
  emptyEmptyHlineSrc = "No Deals Right Now",
  emptyEmptySubTxtSrc = "Let Brands know you're interested",
  emptyEmptyCtaTxtSrc = "Request An Offer",
  emptyEmptyClick = {},
  conBarPad,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-offer")}
      tag="section"
      grid={{
        type: "section",
      }}
      id="PopProd"
    >
      <SecHead
        titleIcn={secHeadTitleIcn}
        titleSrc={secHeadTitleSrc}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        titleSz={secHeadTitleSz}
        titleClr={secHeadTitleClr}
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
        barPad={conBarPad}
        slotId={conSlotId}
      />
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
