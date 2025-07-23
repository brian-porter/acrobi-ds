"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Img } from "./Img";
import { CapStkLR } from "./CapStkLR";
import * as _utils from "./utils";
import _styles from "./CellClip.module.css";

export function CellClip({
  as: _Component = _Builtin.Block,
  cellExample = true,
  id = "off-clip",
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  vizAlt = "__wf_reserved_inherit",
  vizSz = "l",
  vizAsp = "1-1",
  capt = true,
  captTitleSrc = "$0.00 Off",
  typeSrc = "in store",
  limitSrc = "limit 2",
  expSrc = "ends in 2d",
  cellSz = "5xl",
  cellCard = "true",
  cellClick = {},
}) {
  return cellExample ? (
    <_Component
      className={_utils.cx(_styles, "clip-cell")}
      tag="div"
      data-cell-size={cellSz}
      data-cell-card={cellCard}
      id={id}
    >
      <Img
        imgAlt={vizAlt}
        imgSz={vizSz}
        imgAsp={vizAsp}
        imgSrc={vizSrc}
        img={true}
        imgShape="b"
        act={false}
        actActBdg={false}
        actActBdgTxtSrc="1"
        actActClick={{}}
        bnrFullBnrFullAvtrGrp={true}
        bnrFullBnrFullLblSz="r4"
        bnrFullBnrFullLblIcnLoc="r"
        bnrFullBnrFullLblIcn={true}
        bnrFullBnrFullAvtrSz="xs"
        icnBar={false}
        bnr={false}
        icnBarIcnBarL1={false}
        icnBarIcnBarL2={false}
        icnBarIcnBarL3={false}
        icnBarIcnBarR1={false}
        icnBarIcnBarR2={false}
        icnBarIcnBarR3={false}
        icnBarIcnBarL1Src="Default"
        icnBarIcnBarL2Src="Default"
        icnBarIcnBarL3Src="Default"
        icnBarIcnBarR1Src="Default"
        icnBarIcnBarR2Src="Default"
        icnBarIcnBarR3Src="Default"
        bnrBnrTxtSrc="Label"
        bnrBnrIcnSrc="Default"
        bnrFull={false}
        bnrFullBnrFullLblTxtSrc="Label"
        bnrFullBnrFullLblIcnSrc="Default"
        bnrFullBnrFullAvtrSrc1="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        bnrFullBnrFullAvtr2={false}
        bnrFullBnrFullAvtr3={false}
        bnrFullBnrFullAvtr4={false}
        bnrFullBnrFullAvtr5={false}
        bnrFullBnrFullAvtrSrc2="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        bnrFullBnrFullAvtrSrc3="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        bnrFullBnrFullAvtrSrc4="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        bnrFullBnrFullAvtrSrc5="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        tag={false}
        tagTagTxtSrc="3"
        tagTagLoc="tr"
        bnrBnrSz="m"
        bnrBnrLoc="bl"
        bnrFullBnrFullLblTxt={true}
        imgClick={{}}
      />
      {capt ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cell-caption-h")}
          tag="div"
        >
          <CapStkLR
            lTxtSrc={captTitleSrc}
            rTxtSrc={limitSrc}
            lR={true}
            rTxtClr="n500"
            rTxtSz="r4"
            lTxtSz="r1"
            lTxtClr="n900"
          />
          <CapStkLR
            lTxtSrc={typeSrc}
            rTxtSrc={expSrc}
            lR={true}
            lTxtClr="f500"
            lTxtSz="r4"
            rTxtClr="n500"
            rTxtSz="r4"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
