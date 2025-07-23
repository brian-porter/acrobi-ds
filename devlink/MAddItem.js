"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { Cell } from "./Cell";
import { MenuFilter } from "./MenuFilter";
import { Chip } from "./Chip";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MAddItem.module.css";

export function MAddItem({
  as: _Component = _Builtin.Block,
  titleSrc = "Groceries",
  titleClick = {},
  doneClick = {},
  trend = true,
  trendMap,
  trendEmpty = false,
  trendEmptyClick = {},
  trendChipMap,
  exampleOfAllProd = true,
  exampleOfAllProdGen = true,
  scan = false,
  scanMap,
  scanEmpty = false,
  scanEmptyClick = {},
  scanChipMap,
  inteli = true,
  inteliMap,
  inteliEmpty = false,
  inteliEmptyClick = {},
  inteliChipMap,
  buy = true,
  buyMap,
  buyEmpty = false,
  buyEmptyClick = {},
  buyChipMap,
  scanBtnClick = {},
  searchChange,
  searchClick = {},
  fltrBtnClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-itm-add")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "a-header")}
        tag="div"
        data-bs="xs"
      >
        <SecHead
          titleSrc={titleSrc}
          act1Click={doneClick}
          titleClick={titleClick}
          titleSz="h4"
          titleIcn={true}
          titleIcnSrc="Nav_down"
          act1TxtSrc="Done"
          titleIcnSz="xs"
          titleIcnClr="n700"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        {trend ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "result-sec")}
            tag="div"
          >
            <SecHead
              act1={false}
              titleSrc="Trending"
              titleIcn={true}
              titleIcnSrc="hot"
            />
            <BarSs
              barMap={trendMap}
              empty={trendEmpty}
              emptyClick={trendEmptyClick}
              sideFade={true}
              emptyIcnSrc="prod"
              emptyHlineSrc="No Products Found"
              emptyCtaTxtSrc="Make A Request"
              emptySubTxtSrc="Let brands know you're interested"
              slotId="prod"
            />
            <BarSs
              barMap={trendChipMap}
              emptyIcnSrc="circadd"
              slotId="prod-gen"
            />
            <Cell
              cell={exampleOfAllProd}
              captionCapStk={true}
              capStkRow1Src="ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp"
              capStkRow2Clr="n500"
              capLRLTxtSrc="in store"
              capLRRTxtSrc="limit 2"
              capLRLTxtClr="f500"
              capLRRTxtClr="n500"
              imgImgAct={true}
              capStkRow1Lc="2"
              priceBdgAmt="$00.00"
              captionPriceBdg={true}
              caption={true}
              imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif"
              priceBdgAmtHigh={true}
              cellSz="3xl"
              cellClick={{}}
              cellCard=""
              imgImgAlt="__wf_reserved_inherit"
              imgActClick={{}}
              priceBdgAmtH="00.00"
              priceBdgSeller1Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
              priceBdgSeller2={false}
              priceBdgSeller3={false}
              priceBdgSeller2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
              priceBdgSeller3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
              cellActv={false}
              cellClr=""
              captionCapLR={false}
              cellId="prod"
            />
            <MenuFilter
              trending={false}
              trendingOn={false}
              scan={false}
              inteli={false}
            />
            {exampleOfAllProdGen ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-99")}
                tag="div"
                id="prod-gen"
              >
                <Chip chipIcnSrc="addcirc" chipTxtSrc="Milk" />
                <Chip chipIcnSrc="addcirc" chipTxtSrc="Bread" />
                <Chip chipIcnSrc="addcirc" chipTxtSrc="Eggs" />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        ) : null}
        {scan ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "result-sec")}
            tag="div"
          >
            <SecHead
              act1={false}
              titleSrc="Past Scans"
              titleIcn={true}
              titleIcnSrc="history"
            />
            <BarSs
              barMap={scanMap}
              empty={scanEmpty}
              emptyClick={scanEmptyClick}
              sideFade={true}
              emptyIcnSrc="prod"
              emptyHlineSrc="No Products Found"
              emptyCtaTxtSrc="Make A Request"
              emptySubTxtSrc="Let brands know you're interested"
              slotId="prod"
            />
            <BarSs
              barMap={scanChipMap}
              emptyIcnSrc="circadd"
              slotId="prod-gen"
            />
          </_Builtin.Block>
        ) : null}
        {inteli ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "result-sec")}
            tag="div"
          >
            <SecHead
              act1={false}
              titleSrc="InteliSelect"
              titleIcn={true}
              titleIcnSrc="inteli"
            />
            <BarSs
              barMap={inteliMap}
              empty={inteliEmpty}
              emptyClick={inteliEmptyClick}
              sideFade={true}
              emptyIcnSrc="prod"
              emptyHlineSrc="No Products Found"
              emptyCtaTxtSrc="Make A Request"
              emptySubTxtSrc="Let brands know you're interested"
              slotId="prod"
            />
            <BarSs
              barMap={inteliChipMap}
              emptyIcnSrc="circadd"
              slotId="prod-gen"
            />
          </_Builtin.Block>
        ) : null}
        {buy ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "result-sec")}
            tag="div"
          >
            <SecHead
              act1={false}
              titleSrc="Purchases"
              titleIcn={true}
              titleIcnSrc="shopping"
            />
            <BarSs
              barMap={buyMap}
              empty={buyEmpty}
              emptyClick={buyEmptyClick}
              sideFade={true}
              emptyIcnSrc="prod"
              emptyHlineSrc="No Products Found"
              emptyCtaTxtSrc="Buy Now"
              emptySubTxtSrc="Once you make a purchase they will show here"
              slotId="prod"
            />
            <BarSs
              barMap={buyChipMap}
              emptyIcnSrc="circadd"
              slotId="prod-gen"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "doc-btm")}
        tag="div"
        data-bs="xs"
      >
        <InputWBtns
          tTBtnClick={fltrBtnClick}
          lLBtnClick={scanBtnClick}
          fldFldClick={searchClick}
          fldFldOnChange={searchChange}
          lLBtnIcnSrc="scan_qr"
          fldFldLIcnSrc="search"
          fldFldTBtnLink={{
            href: "#",
          }}
          tTBtn={true}
          fldFldTBtn={false}
          tTBtnStyle="nt"
          tTBtnIcn={true}
          tTBtnTxt={false}
          fldFldPholdSrc="Search"
          fldFldLIcnDisp="l"
          tTBtnIcnSrc="filter"
          tTBtnPad="n"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
