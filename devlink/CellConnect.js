"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./CellConnect.module.css";

export function CellConnect({
  as: _Component = _Builtin.Block,
  cellExample = true,
  id,
  peep = true,
  brand = false,
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  vizAlt = "__wf_reserved_inherit",
  vizSz = "xl",
  vizAsp = "1-1",
  vizBdg = false,
  vizBdgClr = "fs500",
  capt = true,
  captSubtxt = true,
  captTitleSrc = "FName LI",
  captSubtxtSrc = "@handle",
  cellSz = "2xl",
  cellCard = "true",
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
      className={_utils.cx(_styles, "cell-connect")}
      tag="div"
      data-cell-sz="2xl"
      id={id}
    >
      <Cell
        capStkRow2Src={captSubtxtSrc}
        capStkRow1Src={captTitleSrc}
        avtrAvtrBdg={vizBdg}
        avtrAvtrBdgClr={vizBdgClr}
        avtrAvtrSrc={vizSrc}
        avtrAvtrAlt={vizAlt}
        cellClick={cellClick}
        cellCard={cellCard}
        cellSz={cellSz}
        caption={capt}
        capStkRow2={captSubtxt}
        avtrAvtrSz={vizSz}
        cell={brand}
        imgImgSrc={vizSrc}
        imgImgAlt={vizAlt}
        imgImgSz={vizSz}
        imgImgClick={cellClick}
        imgImgAsp={vizAsp}
        captionCapStk={true}
        vizAvtr={false}
        vizImg={true}
        capStkRow2Clr="n500"
        capStkRowsAlign="c"
        capStkRow2Align="c"
        capStkRow3Align="c"
        imgImgAct={false}
        imgImgShape="b"
      />
      <Cell
        capStkRow2Src={captSubtxtSrc}
        capStkRow1Src={captTitleSrc}
        avtrAvtrBdg={vizBdg}
        avtrAvtrBdgClr={vizBdgClr}
        avtrAvtrSrc={vizSrc}
        avtrAvtrAlt={vizAlt}
        cellClick={cellClick}
        cellCard={cellCard}
        cellSz={cellSz}
        caption={capt}
        capStkRow2={captSubtxt}
        avtrAvtrSz={vizSz}
        cell={peep}
        imgImgSrc={vizSrc}
        imgImgAlt={vizAlt}
        imgImgSz={vizSz}
        imgImgAsp={vizAsp}
        captionCapStk={true}
        vizAvtr={true}
        vizImg={false}
        capStkRow2Clr="n500"
        capStkRowsAlign="c"
        capStkRow2Align="c"
        capStkRow3Align="c"
      />
      <Button
        btn={btn}
        btnClick={btnClick}
        btnTxtSrc={btnTxtSrc}
        btnStyl={btnStyl}
        btnIcnSrc={btnIcnSrc}
        disabled={btnDis}
      />
    </_Component>
  ) : null;
}
