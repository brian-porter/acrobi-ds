"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecBillboardHead } from "./SecBillboardHead";
import { SecBillboardGrid } from "./SecBillboardGrid";
import { SecProduct } from "./SecProduct";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./SecBillboard.module.css";

export function SecBillboard({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  bgClr = "light-green-100",
  secHeadTitleSrc = "HeadTitleSrc",
  secHeadSubtxt = true,
  secHeadSubtxtSrc = "HeadSubtxtSrc",
  secHeadVizDeskSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/67c786591b3dd889b15ff6ed_12col50-50.webp",
  secHeadVizMoSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/67c7b5aa6b12ded34a23c258_12col220m.webp",
  secHeadVizAlt = "__wf_reserved_inherit",
  secHeadCopyW = "50",
  secHeadTitleSz = "h1b",
  secHeadTitleClr = "n900",
  secHeadSubtxtSz = "h3",
  secHeadSubtxtClr = "n700",
  conProdFeat = false,
  conProdFeatMap,
  conExampleProdFeat = false,
  conProdFeatCellBgClr = "n000",
  conProd = false,
  conProdHead = true,
  conProdHeadTitleSrc = "ProdHeadTitleSrc",
  conProdHeadTitleSz = "h3b",
  conProdHeadTitleClr = "n900",
  conProdMap,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "billboard_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "billboard_main")}
        tag="div"
        data-shadow="y"
        data-bg-clr={bgClr}
      >
        <SecBillboardHead
          conSubtxt={secHeadSubtxt}
          conTitleSrc={secHeadTitleSrc}
          conSubtxtSrc={secHeadSubtxtSrc}
          conCopyW={secHeadCopyW}
          conVizDeskSrc={secHeadVizDeskSrc}
          conVizMoSrc={secHeadVizMoSrc}
          conTitleSz={secHeadTitleSz}
          conSubtxtSz={secHeadSubtxtSz}
          conTitleClr={secHeadTitleClr}
          sec={secHead}
          conVizAlt={secHeadVizAlt}
          conSubtxtClr={secHeadSubtxtClr}
          con={true}
        />
        <SecBillboardGrid
          cellBgClr={conProdFeatCellBgClr}
          sec={conProdFeat}
          cellMap={conProdFeatMap}
          exampleProdFeat={conExampleProdFeat}
        />
        <SecProduct
          secHeadTitleSz={conProdHeadTitleSz}
          secHead={conProdHead}
          secHeadTitleClr={conProdHeadTitleClr}
          secHeadTitleSrc={conProdHeadTitleSrc}
          sec={conProd}
          conCellMap={conProdMap}
          conSideFade={false}
          exampleCellCard="true"
          exampleCellSz="4xl"
          exampleCellClr="n000"
          stats={false}
          statClr="n000"
          secHeadTitleIcn={false}
          conExampleCell={true}
          conExample={true}
          exampleCellProd={true}
        />
        <Spacer szDep="24" size="24" />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
