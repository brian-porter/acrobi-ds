"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecProduct.module.css";

export function SecProduct({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Products",
  secHeadTitleSz = "r2",
  secHeadTitleClr = "in",
  secHeadAct1TxtSrc = "More",
  secHeadAct1Click = {},
  conSideFade = true,
  conCellMap,
  conSlotId = "prod",
  conExampleCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleCellSz = "3xl",
  exampleCellClr,
  exampleCellCard,
  exampleCapt = true,
  exampleNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  examplePriceAmtH = true,
  examplePriceAmtSrc = "$00.00",
  examplePriceAmtHSrc = "00.00",
  examplePriceSeller1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  examplePriceSeller2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  examplePriceSeller3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  examplePriceSeller2 = false,
  examplePriceSeller3 = false,
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
  emptyEmpty = false,
  emptyEmptyIcnSrc = "prod",
  emptyEmptyHlineSrc = "No Products Found",
  emptyEmptySubTxtSrc = "Let brands know you're interested",
  emptyEmptyCtaTxtSrc = "Make A Request",
  emptyEmptyClick = {},
  statClr = "n500",
  exampleInptStep = false,
  exampleActQty = "1",
  exampleActMoreClick = {},
  exampleActLessClick = {},
  conExample = true,
  exampleCellProdFeat = false,
  exampleCellProd = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "prod-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        titleSz={secHeadTitleSz}
        titleClr={secHeadTitleClr}
      />
      <BarSs
        barMap={conCellMap}
        empty={emptyEmpty}
        sideFade={conSideFade}
        emptyIcnSrc={emptyEmptyIcnSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyClick={emptyEmptyClick}
        slotId={conSlotId}
        example={conExample}
        exampleProdFeat={exampleCellProdFeat}
        exampleProd={exampleCellProd}
        barPad="m"
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
        clr={statClr}
      />
    </_Component>
  ) : null;
}
