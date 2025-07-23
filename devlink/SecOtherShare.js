"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./SecOtherShare.module.css";

export function SecOtherShare({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Other",
  secHeadAct1TxtSrc = "More",
  secHeadAct1Click = {},
  conSmsClick = {},
  conEmailClick = {},
  conQrClick = {},
  conLinkClick = {},
  conPrintClick = {},
}) {
  return sec ? (
    <_Component
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "bar-share-types")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "u-bar-ss")} tag="div">
          <Cell
            cellClick={conSmsClick}
            cellSz="l"
            vizAdpt={true}
            vizImg={false}
            captionPriceBdg={false}
            captionCapStk={true}
            capStkRow1Src="SMS"
            adptAdptSz="l"
            capStkRowsAlign="c"
            adptAdptBgClr="green"
            adptAdptIcnSrc="Chat"
            caption={true}
          />
          <Cell
            cellClick={conEmailClick}
            cellSz="l"
            vizAdpt={true}
            vizImg={false}
            captionPriceBdg={false}
            captionCapStk={true}
            capStkRow1Src="Email"
            adptAdptSz="l"
            capStkRowsAlign="c"
            adptAdptBgClr="blue"
            adptAdptIcnSrc="Email"
            caption={true}
          />
          <Cell
            cellClick={conQrClick}
            cellSz="l"
            vizAdpt={true}
            vizImg={false}
            captionPriceBdg={false}
            captionCapStk={true}
            capStkRow1Src="QR Scan"
            adptAdptSz="l"
            capStkRowsAlign="c"
            adptAdptBgClr="purple"
            adptAdptIcnSrc="Scan_qr"
            caption={true}
          />
          <Cell
            cellClick={conLinkClick}
            cellSz="l"
            vizAdpt={true}
            vizImg={false}
            captionPriceBdg={false}
            captionCapStk={true}
            capStkRow1Src="Web Link"
            adptAdptSz="l"
            capStkRowsAlign="c"
            adptAdptBgClr="pink"
            adptAdptIcnSrc="Link"
            caption={true}
          />
          <Cell
            cellClick={conPrintClick}
            cellSz="l"
            vizAdpt={true}
            vizImg={false}
            captionPriceBdg={false}
            captionCapStk={true}
            capStkRow1Src="Print"
            adptAdptSz="l"
            capStkRowsAlign="c"
            adptAdptBgClr="orange"
            adptAdptIcnSrc="Print"
            caption={true}
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
