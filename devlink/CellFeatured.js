"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./CellFeatured.module.css";

export function CellFeatured({
  as: _Component = _Builtin.Block,
  feature = true,
  id,
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  vizAlt = "__wf_reserved_inherit",
  qr = false,
  more = true,
  byVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  byVizAlt = "__wf_reserved_inherit",
  nameSrc = "BrandName",
  hookSrc = "5% Cash Back",
  hook2 = true,
  hook2Src = "Seconday Hook",
  qrClick = {},
  moreClick = {},
  ftrdClick = {},
}) {
  return feature ? (
    <_Component
      className={_utils.cx(_styles, "brand-featured")}
      id={_utils.cx(
        _styles,
        "w-node-_39800453-9761-6a91-115b-1eebc003db28-c003db28"
      )}
      tag="div"
    >
      <Hero
        imgSrc={vizSrc}
        imgAlt={vizAlt}
        icnBarIcnBarL1Click={qrClick}
        icnBarIcnBarR1Click={moreClick}
        avtrAvtrSrc={byVizSrc}
        avtrAvtrAlt={byVizAlt}
        icnBarIcnBarL1Icn={qr}
        avtrAvtrHlineSrc={nameSrc}
        icnBarIcnBarR1Icn={more}
        avtrAvtrSubTxtSrc={hookSrc}
        heroClick={ftrdClick}
        avtrAvtrSubTxt2Src={hook2Src}
        avtrAvtrSubTxt2={hook2}
        avtr={true}
        hline={false}
        icnBarIcnBarL1Src="Qr"
        avtrAvtrShape="r"
        btn={false}
        avtrAvtrHline={true}
        avtrAvtrBdgIcnSrc="Edit"
        btnBtnTxtSrc="Connect"
        btnBtnIcnSrc="Addcirc"
        btnBtnTxt={true}
        fadeBtm={false}
        avtrAvtrHlineSz="r1b"
        avtrAvtrSz="l"
        avtrAvtrSubTxtClr="f500"
        avtrAvtrSubTxtSz="r3"
        avtrAvtrSubTxt2Sz="r3"
        avtrAvtrSubTxt2Clr="f500"
      />
    </_Component>
  ) : null;
}
