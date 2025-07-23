"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Cell } from "./Cell";
import { EmptyCollection } from "./EmptyCollection";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./GridSecProduct.module.css";

export function GridSecProduct({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  stats = false,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "prod",
  secHeadTitleSrc = "Products",
  secHeadTitleSz = "r2",
  secHeadTitleClr = "in",
  secHeadAct1TxtSrc = "Cancel",
  secHeadAct1Click = {},
  conGrid3 = false,
  conGrid5 = true,
  conCellMap,
  conSlotId = "Prod",
  conExampleCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleCaptTitleSrc = "ProductName here with a wrap to a 2nd line and truncation at the second line",
  exampleCaptAmtSrc = "$000",
  exampleCaptAmtHSrc = "000",
  exampleCaptSeller1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleActClick = {},
  exampleCellClick = {},
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
  emptyEmpty = false,
  emptySecBtn = true,
  emptyTirBtn = true,
  emptyBtmDoc = true,
  emptyIcnSrc = "prod",
  emptyHeadlineSrc = "Empty List",
  emptySubtxtSrc = "Use the links below to add items to this list. Next time they'll show up here to choose from.",
  emptySecBtnTxtSrc = "Scan QR or Barcode",
  emptyTirBtnTxtSrc = "Browse Shared Lists",
  emptyPrimeBtnTxtSrc = "Add an Item",
  emptyPrimeBtnStyl = "pf",
  emptySecBtnClick = {},
  emptyTirBtnClick = {},
  emptyPrimeBtnClick = {},
  exampleInptStep = false,
  exampleActQty = "1",
  exampleActMoreClick = {},
  exampleActLessClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-prod")}
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
        titleSz={secHeadTitleSz}
        titleClr={secHeadTitleClr}
      />
      {conGrid3 ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "prod-grid3")}
          tag="div"
          id={conSlotId}
        >
          {conCellMap}
        </_Builtin.Grid>
      ) : null}
      {conGrid5 ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "prod-grid5")}
          id={_utils.cx(
            _styles,
            "w-node-_8502dbf1-c294-66b6-c78a-de2b90752e1a-7f691d92"
          )}
          tag="div"
        >
          {conCellMap ?? (
            <Cell
              capStkRow1Src={exampleCaptTitleSrc}
              priceBdgAmt={exampleCaptAmtSrc}
              cell={conExampleCell}
              imgImgSrc={exampleVizSrc}
              imgImgAlt={exampleVizAlt}
              priceBdgAmtH={exampleCaptAmtHSrc}
              priceBdgSeller1Src={exampleCaptSeller1Src}
              imgActClick={exampleActClick}
              imgImgClick={exampleCellClick}
              imgInptStep={exampleInptStep}
              imgActQty={exampleActQty}
              imgActMoreClick={exampleActMoreClick}
              imgActLessClick={exampleActLessClick}
              caption={true}
              captionCapStk={true}
              captionPriceBdg={true}
              capStkRow1Lc="2"
              imgImgAct={true}
              priceBdgAmtHigh={true}
              priceBdgAmtSz="h5"
              imgImgActBdg={false}
              imgImgIcnBar={false}
              imgIcnBarL1={false}
              imgImgBnr={false}
              imgImgShape="b"
            />
          )}
        </_Builtin.Grid>
      ) : null}
      <EmptyCollection
        empty={emptyEmpty}
        primeBtnClick={emptyPrimeBtnClick}
        secBtnClick={emptySecBtnClick}
        tirBtnClick={emptyTirBtnClick}
        icnSrc={emptyIcnSrc}
        headlineSrc={emptyHeadlineSrc}
        subtxtSrc={emptySubtxtSrc}
        primeBtnTxtSrc={emptyPrimeBtnTxtSrc}
        secBtn={emptySecBtn}
        secBtnTxtSrc={emptySecBtnTxtSrc}
        tirBtnTxtSrc={emptyTirBtnTxtSrc}
        tirBtn={emptyTirBtn}
        btmDoc={emptyBtmDoc}
        primeBtnStyl={emptyPrimeBtnStyl}
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
