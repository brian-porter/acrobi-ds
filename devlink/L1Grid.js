"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./L1Grid.module.css";

export function L1Grid({
  as: _Component = _Builtin.Block,
  l1Grid = true,
  l1Map,
  cellExample = true,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgAlt = "__wf_reserved_inherit",
  pin = false,
  bookmark = false,
  chat = false,
  event = false,
  alert = false,
  bnrIcnSrc = "Default",
  bnrTxtSrc = "ListName",
  cardClick = {},
  slotId,
}) {
  return l1Grid ? (
    <_Component
      className={_utils.cx(_styles, "card-collection")}
      tag="div"
      id={slotId}
    >
      {l1Map ?? (
        <Cell
          imgImgBnrTxtSrc={bnrTxtSrc}
          imgIcnBarL1={pin}
          imgIcnBarL2={bookmark}
          cell={cellExample}
          imgImgSrc={imgSrc}
          imgImgAlt={imgAlt}
          imgIcnBarR1={chat}
          imgIcnBarR2={event}
          imgIcnBarR3={alert}
          imgImgBnrIcnSrc={bnrIcnSrc}
          cellClick={cardClick}
          cellCard="true"
          imgImgBnr={true}
          imgImgIcnBar={true}
          imgIcnBarL1Src=""
          imgIcnBarL2Src=""
          imgIcnBarR1Src=""
          imgIcnBarR2Src=""
          imgIcnBarR3Src=""
          imgImgSz=""
        />
      )}
    </_Component>
  ) : null;
}
