"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./L2Grid.module.css";

export function L2Grid({
  as: _Component = _Builtin.Block,
  l2Grid = true,
  l2Map,
  cellExample = true,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgAlt = "__wf_reserved_inherit",
  pin = false,
  bookmark = false,
  chat = false,
  event = false,
  alert = false,
  name = "ListName",
  cellClick = {},
  slotId = "list-type",
}) {
  return l2Grid ? (
    <_Component
      className={_utils.cx(_styles, "card-collection")}
      tag="div"
      id={slotId}
    >
      {l2Map ?? (
        <Cell
          capStkRow1Src={name}
          imgIcnBarR1={chat}
          imgIcnBarR2={event}
          imgIcnBarL1={pin}
          imgIcnBarL2={bookmark}
          imgIcnBarR3={alert}
          cell={cellExample}
          imgImgSrc={imgSrc}
          imgImgAlt={imgAlt}
          cellClick={cellClick}
          captionCapStk={true}
          capLRLTxtSrc="23kb"
          capLRRTxtSrc="12h"
          capLRLTxtClr="n500"
          capLRRTxtClr="n500"
          cellCard="true"
          caption={true}
          capStkRowsAlign="l"
          imgImgIcnBar={true}
          imgIcnBarL1Src="Pin"
          imgIcnBarL2Src="Bookmark"
          imgIcnBarR1Src="Chat"
          imgIcnBarR2Src="Cal_sched"
          imgIcnBarR3Src="Alarm"
          capStkRow1Sz="r3"
          cellId="list-type"
        />
      )}
    </_Component>
  ) : null;
}
