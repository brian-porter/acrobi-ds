"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { EmptyBar } from "./EmptyBar";
import { CellProdFeat } from "./CellProdFeat";
import { Cell } from "./Cell";
import { CellCategory } from "./CellCategory";
import { CellConnect } from "./CellConnect";
import { Breadcrumb } from "./Breadcrumb";
import * as _utils from "./utils";
import _styles from "./BarSs.module.css";

export function BarSs({
  as: _Component = _Builtin.Block,
  barMap,
  slotId,
  empty = false,
  emptyIcnSrc = "default",
  emptyHlineSrc = "Headline",
  emptySubTxtSrc = "Subhead description below",
  emptyCtaTxtSrc = "CTA Wording",
  emptyClick = {},
  sideFade = false,
  barPad,
  example = true,
  exampleProdFeat = false,
  exampleBreadcrumb = false,
  exampleList = false,
  exampleConnectPeepBrand = false,
  exampleGroup = false,
  exampleCategories = false,
  exampleProd = false,
  cellGap = "50",
}) {
  return (
    <_Component className={_utils.cx(_styles, "bar-ss")} tag="div">
      <EmptyBar
        empty={empty}
        icnSrc={emptyIcnSrc}
        hlineSrc={emptyHlineSrc}
        subTxtSrc={emptySubTxtSrc}
        ctaTxtSrc={emptyCtaTxtSrc}
        click={emptyClick}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "u-collection-ss")}
        tag="div"
        data-pad={barPad}
        data-gap={cellGap}
        id={slotId}
      >
        {barMap ??
          (example ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "example-map")}
              tag="div"
            >
              <CellProdFeat cell={exampleProdFeat} cellSz="4xl" />
              <Cell
                cell={exampleList}
                cellSz="2xl"
                captionCapStk={true}
                caption={true}
                capStkRow1Src="ListName"
                capStkRow1Sz="r4"
              />
              <CellCategory cell={exampleCategories} />
              <Cell
                cell={exampleGroup}
                cellSz="3xl"
                caption={true}
                imgImgBnr={false}
                imgImgBnrFull={true}
                imgImgBnrAvtr2={true}
                imgImgBnrFullTxtSrc="123"
                imgImgBnrFullIcnSrc="Members"
                captionCapStk={true}
                capStkRow1Src=""
              />
              <CellConnect cellExample={exampleConnectPeepBrand} />
              <Breadcrumb breadcrumb={exampleBreadcrumb} itmClr="n200" />
              <Cell
                cell={exampleProd}
                caption={true}
                captionCapStk={true}
                captionPriceBdg={true}
                capStkRow1Src="ProductName here with a wrap to a 2nd line and truncation at the second line"
                capStkRow1Lc="2"
                imgImgAct={true}
                priceBdgAmtHigh={true}
                priceBdgAmtSz="h5"
                priceBdgAmt="$000"
                imgImgActBdg={false}
                imgImgIcnBar={false}
                imgIcnBarL1={false}
                imgImgBnr={false}
                imgImgShape="b"
                imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                imgImgAlt="__wf_reserved_inherit"
                priceBdgAmtH="000"
                priceBdgSeller1Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
                imgActClick={{}}
                imgImgClick={{}}
                imgInptStep={false}
                imgActQty="1"
                imgActMoreClick={{}}
                imgActLessClick={{}}
                cellSz="4xl"
                cellClr=""
                cellCard=""
              />
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
      {sideFade ? (
        <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-l")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-r")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
