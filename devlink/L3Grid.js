"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./L3Grid.module.css";

export function L3Grid({
  as: _Component = _Builtin.Block,
  l3Grid = true,
  itmMap,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmDesc = "ProductName here with a wrap to a 2nd line and truncation at the second line",
  itmAmt = "$000",
  itmAmtHigh = false,
  itmAmtH = "000",
  itmClick = {},
  itmAddClick = {},
  itmAddBdg = false,
  itmAddBdgTxtSrc = "1",
  itmSeller1 = true,
  itmSeller2 = false,
  itmSeller3 = false,
  itmSeller1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  itmSeller2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  itmSeller3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleItem = true,
}) {
  return l3Grid ? (
    <_Component className={_utils.cx(_styles, "card-collection")} tag="div">
      {itmMap ?? (
        <Cell
          capStkRow1Src={itmDesc}
          imgImgSrc={itmImgSrc}
          imgImgAlt={itmImgAlt}
          priceBdgAmt={itmAmt}
          priceBdgAmtHigh={itmAmtHigh}
          priceBdgAmtH={itmAmtH}
          cellClick={itmClick}
          imgActClick={itmAddClick}
          imgImgActBdg={itmAddBdg}
          imgActBdgTxtSrc={itmAddBdgTxtSrc}
          priceBdgSeller1={itmSeller1}
          priceBdgSeller2={itmSeller2}
          priceBdgSeller3={itmSeller3}
          priceBdgSeller1Src={itmSeller1Src}
          priceBdgSeller2Src={itmSeller2Src}
          priceBdgSeller3Src={itmSeller3Src}
          cell={exampleItem}
          captionCapStk={true}
          vizImg={true}
          capStkRowsAlign="l"
          adptAdptSz="l"
          imgImgAct={true}
          capStkRow2={false}
          capStkRow1Lc="2"
          captionPriceBdg={true}
          capLRLTxtClr="f500"
          capLRRTxtClr="n500"
          capLRLTxtSrc="type"
          capLRRTxtSrc="limit"
          caption={true}
        />
      )}
    </_Component>
  ) : null;
}
