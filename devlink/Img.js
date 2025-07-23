"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlIconbar } from "./OlIconbar";
import { OlTag } from "./OlTag";
import { OlBanner } from "./OlBanner";
import { OlBannerFull } from "./OlBannerFull";
import { OlSuperAction } from "./OlSuperAction";
import * as _utils from "./utils";
import _styles from "./Img.module.css";

export function Img({
  as: _Component = _Builtin.Block,
  img = true,
  id = "image",
  icnBar = false,
  tag = false,
  act = false,
  bnr = false,
  bnrFull = false,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgAlt = "__wf_reserved_inherit",
  imgSz,
  imgShape = "b",
  imgAsp = "1-1",
  imgGroup,
  icnBarIcnBarL1 = false,
  icnBarIcnBarL2 = false,
  icnBarIcnBarL3 = false,
  icnBarIcnBarR1 = false,
  icnBarIcnBarR2 = false,
  icnBarIcnBarR3 = false,
  icnBarIcnBarL1Src = "Default",
  icnBarIcnBarL2Src = "Default",
  icnBarIcnBarL3Src = "Default",
  icnBarIcnBarR1Src = "Default",
  icnBarIcnBarR2Src = "Default",
  icnBarIcnBarR3Src = "Default",
  tagTagLoc = "tr",
  tagTagTxtSrc = "3",
  actInptStep = false,
  actActBdg = false,
  actActIcnSrc = "Addcirc",
  bnrBnrIcnSrc = "Default",
  bnrBnrTxtSrc = "Label",
  bnrBnrSz = "m",
  bnrBnrLoc = "bl",
  bnrBnrClr = "n",
  bnrFullBnrFullLbl = true,
  bnrFullBnrFullAvtrGrp = false,
  bnrFullBnrFullLoc = "btm",
  bnrFullBnrFullContAlign = "sb",
  bnrFullBnrFullLblTxt = true,
  bnrFullBnrFullLblIcn = false,
  bnrFullBnrFullLblTxtSrc = "Label",
  bnrFullBnrFullLblIcnSrc = "Default",
  bnrFullBnrFullLblSz = "r2",
  bnrFullBnrFullLblIcnLoc = "l",
  bnrFullBnrFullAvtr2 = false,
  bnrFullBnrFullAvtr3 = false,
  bnrFullBnrFullAvtr4 = false,
  bnrFullBnrFullAvtr5 = false,
  bnrFullBnrFullAvtrSrc1 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  bnrFullBnrFullAvtrSrc2 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  bnrFullBnrFullAvtrSrc3 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  bnrFullBnrFullAvtrSrc4 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  bnrFullBnrFullAvtrSrc5 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  bnrFullBnrFullAvtrSz = "s",
  imgClick = {},
  actActBdgTxtSrc = "1",
  actQty = "1",
  actMoreClick = {},
  actLessClick = {},
  actActClick = {},
}) {
  return img ? (
    <_Component
      className={_utils.cx(_styles, "obj_wrap")}
      tag="div"
      data-overlap={imgGroup}
      data-shape={imgShape}
      id={id}
      {...imgClick}
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "img")}
        loading="lazy"
        width="Auto"
        height="Auto"
        data-obj-size={imgSz}
        data-obj-shape="b"
        data-obj-asp={imgAsp}
        src={imgSrc}
      />
      <OlIconbar
        icnL1Src={icnBarIcnBarL1Src}
        icnR1Src={icnBarIcnBarR1Src}
        icnR2Src={icnBarIcnBarR2Src}
        icnL3={icnBarIcnBarL3}
        icnR3Src={icnBarIcnBarR3Src}
        icnL2Src={icnBarIcnBarL2Src}
        icnL1={icnBarIcnBarL1}
        icnL2={icnBarIcnBarL2}
        icnR1={icnBarIcnBarR1}
        icnR2={icnBarIcnBarR2}
        icnR3={icnBarIcnBarR3}
        icnL3Src={icnBarIcnBarL3Src}
        icnBar={icnBar}
      />
      <OlTag tag={tag} tagTxtSrc={tagTagTxtSrc} tagLoc={tagTagLoc} />
      <OlBanner
        bnrSz={bnrBnrSz}
        bnrIcnSrc={bnrBnrIcnSrc}
        bnrTxtSrc={bnrBnrTxtSrc}
        bnr={bnr}
        bnrLoc={bnrBnrLoc}
        bnrClr={bnrBnrClr}
      />
      <OlBannerFull
        bnr={bnrFull}
        bnrLoc={bnrFullBnrFullLoc}
        bnrContAlign={bnrFullBnrFullContAlign}
        avtrGrp={bnrFullBnrFullAvtrGrp}
        avtrSz={bnrFullBnrFullAvtrSz}
        avtr1Src={bnrFullBnrFullAvtrSrc1}
        avtr2Src={bnrFullBnrFullAvtrSrc2}
        avtr3Src={bnrFullBnrFullAvtrSrc3}
        avtr4Src={bnrFullBnrFullAvtrSrc4}
        avtr5Src={bnrFullBnrFullAvtrSrc5}
        avtr3={bnrFullBnrFullAvtr3}
        avtr4={bnrFullBnrFullAvtr4}
        avtr5={bnrFullBnrFullAvtr5}
        lbl={bnrFullBnrFullLbl}
        lblSz={bnrFullBnrFullLblSz}
        lblTxt={bnrFullBnrFullLblTxt}
        lblTxtSrc={bnrFullBnrFullLblTxtSrc}
        lblIcn={bnrFullBnrFullLblIcn}
        lblIcnSrc={bnrFullBnrFullLblIcnSrc}
        lblIcnLoc={bnrFullBnrFullLblIcnLoc}
        avtr2={bnrFullBnrFullAvtr2}
      />
      <OlSuperAction
        act={act}
        actClick={actActClick}
        bdg={actActBdg}
        bdgTxtSrc={actActBdgTxtSrc}
        actIcnSrc={actActIcnSrc}
        inptStep={actInptStep}
        qty={actQty}
        moreClick={actMoreClick}
        lessClick={actLessClick}
      />
    </_Component>
  ) : null;
}
