"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./BrandCell.module.css";

export function BrandCell({
  as: _Component = _Builtin.Block,
  cellExample = true,
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  vizAlt = "__wf_reserved_inherit",
  vizSz = "2xl",
  vizAsp = "1-1",
  capt = true,
  captSubtxt = false,
  captTitleSrc = "BrandName",
  captSubtxtSrc = "@handle",
  cellSz = "auto",
  cellCard,
  cellClick = {},
  btn = true,
  btnTxtSrc = "Connect",
  btnIcnSrc = "addcircle",
  btnStyl = "pl",
  btnDis = "false",
  btnClick = {},
}) {
  return cellExample ? (
    <_Component
      className={_utils.cx(_styles, "cell-brands")}
      tag="div"
      cell-sz=""
    >
      <Cell
        cellClick={cellClick}
        imgImgSrc={vizSrc}
        imgImgAlt={vizAlt}
        imgImgSz={vizSz}
        imgImgAsp={vizAsp}
        capStkRow1Src={captTitleSrc}
        caption={capt}
        capStkRow2={captSubtxt}
        capStkRow2Src={captSubtxtSrc}
        cellSz={cellSz}
        cellCard={cellCard}
        captionCapStk={true}
        vizImg={true}
        capStkRowsAlign="l"
        capStkRow2Clr="n500"
        avtrAvtrBdg={false}
        avtrAvtrBdgClr="fs500"
        avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        avtrAvtrAlt="__wf_reserved_inherit"
      />
      <Button
        btnTxtSrc={btnTxtSrc}
        btnStyl={btnStyl}
        btn={btn}
        btnIcnSrc={btnIcnSrc}
        btnClick={btnClick}
        disabled={btnDis}
      />
    </_Component>
  ) : null;
}
