"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { EmptyBar } from "./EmptyBar";
import * as _utils from "./utils";
import _styles from "./ImgSs.module.css";

export function ImgSs({
  as: _Component = _Builtin.Block,
  imgBar = true,
  sideFade = true,
  empty = true,
  cellVizImg = true,
  cellVizIcn = false,
  cellVizAdpt = false,
  cellVizAvtr = false,
  cellActive = false,
  cellCaption = true,
  cellSz = "3xl",
  cellCellCard,
  cellCellClick = {},
  vizImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  vizImgAlt = "__wf_reserved_inherit",
  vizImgClear = false,
  vizImgAct = false,
  vizImgBnr = false,
  vizImgBnrIcnSrc = "Default",
  vizImgBnrTxtSrc = "ListName",
  vizImgSz,
  vizImgAsp = "1-1",
  vizAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  vizAvtrAlt = "__wf_reserved_inherit",
  vizAvtrSz = "l",
  vizImgActClick = {},
  captionCapStk = true,
  captionPriceBdg = false,
  captionCapLR = false,
  captionCapStkRow1Src = "Name",
  captionCapStkRow1Sz = "r4",
  captionCapStkRow1Clr = "n900",
  captionCapStkRow1Lc = "1",
  captionCaptStkRow1Align = "l",
  captionCaptStkRow2 = false,
  captionCaptStkRow2Src = "Row2",
  captionCapStkRow2Sz = "r4",
  captionCapStkRow2Clr,
  captionCapStkRow2Lc = "1",
  captionCaptStkRow2Align,
  captionCaptLRlTxtSrc = "left text",
  captionCaptLRlTxtSz = "r4",
  captionCaptLRlTxtClr = "n700",
  captionCaptLRrTxtSrc = "right text",
  emptyIcnSrc = "default",
  emptyHlineSrc = "Headline",
  emptySubTxtSrc = "Subhead description below",
  emptyCtaTxtSrc = "CTA Wording",
  emptyEmptyClick = {},
  cellMap,
  slotId = "image",
  cellExample = true,
  captionCaptLRrTxtSz = "r4",
  captionCaptLRrTxtClr = "n700",
}) {
  return imgBar ? (
    <_Component className={_utils.cx(_styles, "bar-sidescroll")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "u-bar-ss")}
        tag="div"
        id={slotId}
      >
        {cellMap ?? (
          <EmptyBar
            empty={empty}
            icnSrc={emptyIcnSrc}
            hlineSrc={emptyHlineSrc}
            subTxtSrc={emptySubTxtSrc}
            ctaTxtSrc={emptyCtaTxtSrc}
            click={emptyEmptyClick}
          />
        )}
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
  ) : null;
}
