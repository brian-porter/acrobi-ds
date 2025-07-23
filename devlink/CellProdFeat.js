"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import { Button } from "./Button";
import { InputStepper } from "./InputStepper";
import * as _utils from "./utils";
import _styles from "./CellProdFeat.module.css";

export function CellProdFeat({
  as: _Component = _Builtin.Block,
  cell = true,
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  vizAlt = "__wf_reserved_inherit",
  vizSz,
  capt = true,
  captTitleSrc = "Primary Offer Name Goes Here For Two Lines",
  captSubtxt = false,
  captSubtxtSrc = "Subtext copy goes here",
  amt = "$000",
  amtHigh = false,
  amtH = "00.00",
  seller2 = false,
  seller3 = false,
  seller1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  seller2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  seller3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  cellSz = "auto",
  cellCard,
  cellClr,
  cellClick = {},
  favBtn = true,
  listBtn = true,
  cartBtn = true,
  favIcnSrc = "favs",
  favIcnClr = "in",
  favBtnDis = "false",
  favBtnClick = {},
  listBtnDis = "false",
  listBtnClick = {},
  cartBtnDis = "false",
  cartBtnClick = {},
  cartStep = false,
  cartQty = "0",
  cartMoreClick = {},
  cartLessClick = {},
}) {
  return cell ? (
    <_Component
      className={_utils.cx(_styles, "cell-product")}
      tag="div"
      data-cell-sz=""
      data-bg-clr={cellClr}
    >
      <Cell
        caption={capt}
        capStkRow2={captSubtxt}
        capStkRow2Src={captSubtxtSrc}
        capStkRow1Src={captTitleSrc}
        cellClick={cellClick}
        cellSz={cellSz}
        imgImgSrc={vizSrc}
        imgImgAlt={vizAlt}
        imgImgSz={vizSz}
        cellCard={cellCard}
        priceBdgAmtHigh={amtHigh}
        priceBdgSeller2={seller2}
        priceBdgSeller3={seller3}
        priceBdgSeller1Src={seller1Src}
        priceBdgSeller2Src={seller2Src}
        priceBdgSeller3Src={seller3Src}
        priceBdgAmt={amt}
        priceBdgAmtH={amtH}
        captionCapStk={true}
        vizAvtr={false}
        vizImg={true}
        capStkRowsAlign="l"
        capStkRow2Clr="n500"
        avtrAvtrBdg={false}
        avtrAvtrBdgClr="fs500"
        avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        avtrAvtrAlt="__wf_reserved_inherit"
        avtrAvtrSz="l"
        capStkRow1Sz="r2"
        capStkRow1Lc="3"
        capStkRow1Clr="n999"
        captionPriceBdg={true}
        priceBdgAmtSz="h5"
        imgImgShape="b"
      />
      <_Builtin.Block className={_utils.cx(_styles, "div-block-139")} tag="div">
        <Button
          btn={favBtn}
          btnIcnSrc={favIcnSrc}
          btnClick={favBtnClick}
          disabled={favBtnDis}
          lblClr={favIcnClr}
          btnTxtSrc="Favs"
          btnStyl="nt"
          btnSz="m"
          btnTxt={false}
        />
        <Button
          btn={listBtn}
          btnClick={listBtnClick}
          disabled={listBtnDis}
          btnTxtSrc="List"
          btnIcnSrc="list"
          btnStyl="nt"
          btnSz="m"
          btnTxt={false}
        />
        <Button
          btn={cartBtn}
          btnClick={cartBtnClick}
          disabled={cartBtnDis}
          btnTxtSrc="Add to"
          btnIcnSrc="Cart"
          btnStyl="pf"
          btnSz="m"
          btnIcnLoc="r"
        />
        {cartStep ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-140")}
            tag="div"
          >
            <InputStepper
              qty={cartQty}
              moreClick={cartMoreClick}
              lessClick={cartLessClick}
              inptStep={true}
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
