"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./CellLoyalty.module.css";

export function CellLoyalty({
  as: _Component = _Builtin.Block,
  cell = true,
  id = "Loyalty",
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  vizAlt = "__wf_reserved_inherit",
  vizSz = "xl",
  nameSrc = "BrandName",
  hookSrc = "Offer1Title",
  hook2 = true,
  hook2Src = "Offer2Title",
  cellSz = "auto",
  cellCard,
  cellClick = {},
}) {
  return cell ? (
    <_Component
      className={_utils.cx(_styles, "brand-offer")}
      tag="div"
      data-cell-size={cellSz}
      data-cell-card={cellCard}
      id={id}
      {...cellClick}
    >
      <Cell
        imgImgSrc={vizSrc}
        imgImgAlt={vizAlt}
        imgImgSz={vizSz}
        caption={false}
        vizImg={true}
        capStkRowsAlign="c"
        capStkRow2={false}
        capStkRow2Src="@handle"
        capStkRow2Clr="n500"
        capStkRow1Src="@handle"
        avtrAvtrBdg={false}
        avtrAvtrBdgClr="fs500"
        avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        avtrAvtrAlt="__wf_reserved_inherit"
        cellClick={{}}
        capStkRow1Clr="n500"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "brand-offer-txt")}
        tag="div"
      >
        <Label txtSrc={nameSrc} lblSz="r1" icnLoc="l" icn={false} />
        <Label txtSrc={hookSrc} icn={false} lblClr="f500" lblSz="r2" />
        <Label
          txtSrc={hook2Src}
          lbl={hook2}
          icn={false}
          lblClr="f500"
          lblSz="r2"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
