"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Img } from "./Img";
import { Avatar } from "./Avatar";
import { AdaptIcon } from "./AdaptIcon";
import { Icon } from "./Icon";
import { CapStkTxt2Row } from "./CapStkTxt2Row";
import { CapStkPriceBadge } from "./CapStkPriceBadge";
import { CapStkLR } from "./CapStkLR";
import { Rating } from "./Rating";
import * as _utils from "./utils";
import _styles from "./Cell.module.css";

export function Cell({
  as: _Component = _Builtin.Block,
  cell = true,
  cellId,
  cellActv = false,
  vizImg = true,
  vizAdpt = false,
  vizAvtr = false,
  vizIcn = false,
  caption = false,
  cellSz = "auto",
  imgImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgImgAlt = "__wf_reserved_inherit",
  imgImgSz,
  imgImgAsp = "1-1",
  imgImgShape = "r",
  imgImgAct = false,
  imgImgActBdg = false,
  cellClr,
  cellCard,
  cellClick = {},
  imgImgIcnBar = false,
  imgIcnBarL1 = false,
  imgIcnBarL2 = false,
  imgIcnBarL3 = false,
  imgIcnBarR1 = false,
  imgIcnBarR2 = false,
  imgIcnBarR3 = false,
  imgIcnBarL1Src = "Default",
  imgIcnBarL2Src = "Default",
  imgIcnBarL3Src = "Default",
  imgIcnBarR1Src = "Default",
  imgIcnBarR2Src = "Default",
  imgIcnBarR3Src = "Default",
  imgImgBnr = false,
  imgImgBnrTxtSrc = "Label",
  imgImgBnrIcnSrc = "Default",
  imgImgBnrLoc = "bl",
  imgImgBnrSz = "m",
  imgImgBnrFull = false,
  imgImgBnrFullAvtrGrp = true,
  imgImgBnrFullLblIcn = true,
  imgImgBnrFullLblTxt = true,
  imgImgBnrFullTxtSrc = "Label",
  imgImgBnrFullIcnSrc = "Default",
  imgImgBnrFullLblSz = "r4",
  imgImgBnrAvtr2 = false,
  imgImgBnrAvtr3 = false,
  imgImgBnrAvtr4 = false,
  imgImgBnrAvtr5 = false,
  imgImgBnrAvtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  imgImgBnrAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  imgImgBnrAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  imgImgBnrAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  imgImgBnrAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  imgImgTag = false,
  imgImgTagTxtSrc = "3",
  imgImgTagLoc = "tr",
  adptAdptIcnSrc = "Default",
  adptAdptBgClr = "n300",
  adptAdptSz = "m",
  adptAdptShape = "r",
  avtrAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAvtrAlt = "__wf_reserved_inherit",
  avtrAvtrSz = "l",
  avtrAvtrShape = "c",
  avtrAvtrBdg = false,
  avtrAvtrBdgClr = "fd500",
  icnIcnSrc = "default",
  icnIcnSz = "m",
  captionCapStk = false,
  captionPriceBdg = false,
  captionCapLR = false,
  captionRating = false,
  capStkRowsAlign = "l",
  capStkRow1Src = "Row1",
  capStkRow1Sz = "r3",
  capStkRow1Clr = "n900",
  capStkRow1Lc = "1",
  capStkRow2 = false,
  capStkRow2Src = "Row2",
  capStkRow2Align,
  capStkRow2Sz = "r4",
  capStkRow2Clr,
  capStkRow2Lc = "1",
  priceBdgAmt = "$000",
  priceBdgAmtSz = "r1",
  priceBdgAmtClr = "n999",
  priceBdgAmtHigh = false,
  priceBdgAmtH = "00.00",
  priceBdgAmtHSz = "r3",
  priceBdgImgGrpSz = "xs",
  priceBdgSeller1 = true,
  priceBdgSeller2 = false,
  priceBdgSeller3 = false,
  priceBdgSeller1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  priceBdgSeller2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  priceBdgSeller3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  capLRLTxtSrc = "left text",
  capLRRTxtSrc = "right text",
  capLRLTxtClr = "n700",
  capLRLTxtSz = "r4",
  capLRRTxtClr = "n700",
  capLRRTxtSz = "r4",
  avtrAvtrClick = {},
  imgImgClick = {},
  capStkRow3 = false,
  capStkRow3Src = "Row3",
  capStkRow3Align = "l",
  capStkRow3Sz = "r4",
  capStkRow3Clr,
  capStkRow3Lc = "1",
  icnIcnClr,
  imgInptStep = false,
  imgActIcnSrc = "Addcirc",
  imgActBdgTxtSrc = "1",
  imgActQty = "1",
  imgActMoreClick = {},
  imgActLessClick = {},
  imgActClick = {},
}) {
  return cell ? (
    <_Component
      className={_utils.cx(_styles, "cell-wrap")}
      tag="div"
      data-cell-sz={cellSz}
      data-card={cellCard}
      data-bg-clr={cellClr}
      id={cellId}
      {...cellClick}
    >
      {cellActv ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cell-select")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "cell-subject")} tag="div">
        <Img
          img={vizImg}
          imgSrc={imgImgSrc}
          imgShape={imgImgShape}
          act={imgImgAct}
          imgAlt={imgImgAlt}
          actActBdg={imgImgActBdg}
          actActBdgTxtSrc={imgActBdgTxtSrc}
          actActClick={imgActClick}
          icnBar={imgImgIcnBar}
          bnr={imgImgBnr}
          icnBarIcnBarL1={imgIcnBarL1}
          icnBarIcnBarL2={imgIcnBarL2}
          icnBarIcnBarL3={imgIcnBarL3}
          icnBarIcnBarR1={imgIcnBarR1}
          icnBarIcnBarR2={imgIcnBarR2}
          icnBarIcnBarR3={imgIcnBarR3}
          icnBarIcnBarL1Src={imgIcnBarL1Src}
          icnBarIcnBarL2Src={imgIcnBarL2Src}
          icnBarIcnBarL3Src={imgIcnBarL3Src}
          icnBarIcnBarR1Src={imgIcnBarR1Src}
          icnBarIcnBarR2Src={imgIcnBarR2Src}
          icnBarIcnBarR3Src={imgIcnBarR3Src}
          bnrBnrTxtSrc={imgImgBnrTxtSrc}
          bnrBnrIcnSrc={imgImgBnrIcnSrc}
          bnrFull={imgImgBnrFull}
          bnrFullBnrFullLblTxtSrc={imgImgBnrFullTxtSrc}
          bnrFullBnrFullLblIcnSrc={imgImgBnrFullIcnSrc}
          bnrFullBnrFullAvtrSrc1={imgImgBnrAvtr1Src}
          bnrFullBnrFullAvtr2={imgImgBnrAvtr2}
          bnrFullBnrFullAvtr3={imgImgBnrAvtr3}
          bnrFullBnrFullAvtr4={imgImgBnrAvtr4}
          bnrFullBnrFullAvtr5={imgImgBnrAvtr5}
          bnrFullBnrFullAvtrSrc2={imgImgBnrAvtr2Src}
          bnrFullBnrFullAvtrSrc3={imgImgBnrAvtr3Src}
          bnrFullBnrFullAvtrSrc4={imgImgBnrAvtr4Src}
          bnrFullBnrFullAvtrSrc5={imgImgBnrAvtr5Src}
          tag={imgImgTag}
          tagTagTxtSrc={imgImgTagTxtSrc}
          tagTagLoc={imgImgTagLoc}
          imgSz={imgImgSz}
          bnrFullBnrFullAvtrGrp={imgImgBnrFullAvtrGrp}
          bnrFullBnrFullLblSz={imgImgBnrFullLblSz}
          bnrFullBnrFullLblIcn={imgImgBnrFullLblIcn}
          imgAsp={imgImgAsp}
          bnrBnrSz={imgImgBnrSz}
          bnrBnrLoc={imgImgBnrLoc}
          bnrFullBnrFullLblTxt={imgImgBnrFullLblTxt}
          imgClick={imgImgClick}
          actInptStep={imgInptStep}
          actActIcnSrc={imgActIcnSrc}
          actQty={imgActQty}
          actMoreClick={imgActMoreClick}
          actLessClick={imgActLessClick}
          bnrFullBnrFullLblIcnLoc="r"
          bnrFullBnrFullAvtrSz="xs"
        />
        <Avatar
          avtr={vizAvtr}
          avtrSz={avtrAvtrSz}
          avtrSrc={avtrAvtrSrc}
          avtrAlt={avtrAvtrAlt}
          bdg={avtrAvtrBdg}
          bdgClr={avtrAvtrBdgClr}
          avtrShape={avtrAvtrShape}
          avtrClick={avtrAvtrClick}
          bdgTxt={false}
        />
        <AdaptIcon
          adpt={vizAdpt}
          adptSz={adptAdptSz}
          adptBgClr={adptAdptBgClr}
          icnSrc={adptAdptIcnSrc}
          adptShape={adptAdptShape}
        />
        {vizIcn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cell-icn-pad")}
            tag="div"
          >
            <Icon icnSz={icnIcnSz} icnSrc={icnIcnSrc} icnClr={icnIcnClr} />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {caption ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cell-caption")}
          tag="div"
        >
          <CapStkTxt2Row
            row1Src={capStkRow1Src}
            row2={capStkRow2}
            txt2Row={captionCapStk}
            row1Clr={capStkRow1Clr}
            row2Src={capStkRow2Src}
            row1Lc={capStkRow1Lc}
            align={capStkRowsAlign}
            row1Sz={capStkRow1Sz}
            row2Sz={capStkRow2Sz}
            row2Clr={capStkRow2Clr}
            row2Lc={capStkRow2Lc}
            row2Align={capStkRow2Align}
            row3={capStkRow3}
            row3Src={capStkRow3Src}
            row3Align={capStkRow3Align}
            row3Sz={capStkRow3Sz}
            row3Clr={capStkRow3Clr}
            row3Lc={capStkRow3Lc}
            capPad=""
          />
          <CapStkPriceBadge
            amtL={priceBdgAmt}
            imgGrp={priceBdgSeller1}
            img2={priceBdgSeller2}
            img3={priceBdgSeller3}
            img1Src={priceBdgSeller1Src}
            img2Src={priceBdgSeller2Src}
            img3Src={priceBdgSeller3Src}
            amtHigh={priceBdgAmtHigh}
            amtH={priceBdgAmtH}
            amtBdg={captionPriceBdg}
            amtHSz={priceBdgAmtHSz}
            imgGrpSz={priceBdgImgGrpSz}
            amtLSz={priceBdgAmtSz}
            amtLClr={priceBdgAmtClr}
            bdg1TxtSrc="0"
            bdg1IcnSrc="default"
            bdg2={false}
            bdg2TxtSrc="0"
            bdg2IcnSrc="default"
            bdg3={false}
            bdg3TxtSrc="0"
            bdg3IcnSrc="default"
            img4={false}
            img5={false}
            img4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
            img5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
          />
          <CapStkLR
            lR={captionCapLR}
            lTxtSrc={capLRLTxtSrc}
            rTxtSrc={capLRRTxtSrc}
            lTxtClr={capLRLTxtClr}
            lTxtSz={capLRLTxtSz}
            rTxtClr={capLRRTxtClr}
            rTxtSz={capLRRTxtSz}
            capPad=""
          />
          <Rating
            rating={captionRating}
            valueSrc="3.5"
            qtySrc="1k"
            value={true}
            qty={false}
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
