"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CapStkBadge } from "./CapStkBadge";
import { ImageGroup } from "./ImageGroup";
import * as _utils from "./utils";
import _styles from "./CapStkPriceBadge.module.css";

export function CapStkPriceBadge({
  as: _Component = _Builtin.Block,
  amtBdg = true,
  amtL = "$000",
  amtLSz = "r1",
  amtLClr = "n999",
  amtHigh = false,
  amtH = "000",
  amtHSz = "r3",
  badges = false,
  bdg1 = true,
  bdg2 = true,
  bdg3 = true,
  bdg1TxtSrc = "0",
  bdg1IcnSrc = "default",
  bdg2TxtSrc = "0",
  bdg2IcnSrc = "default",
  bdg3TxtSrc = "0",
  bdg3IcnSrc = "default",
  imgGrp = false,
  imgGrpSz = "xs",
  img2 = false,
  img3 = false,
  img4 = false,
  img5 = false,
  img1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
}) {
  return amtBdg ? (
    <_Component className={_utils.cx(_styles, "price-badges")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "amount")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "pbdg-price")}
          tag="div"
          data-clr={amtLClr}
          data-fs={amtLSz}
        >
          {amtL}
        </_Builtin.Block>
        {amtHigh ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "pbdg-price-high")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "pbdg-sep")}
              tag="div"
              data-fs="r4"
            >
              {"-"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "pbdg-price-h")}
              tag="div"
              data-clr="n300"
              data-fs={amtHSz}
            >
              {amtH}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {badges ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "capstk-badges")}
          tag="div"
        >
          <CapStkBadge
            bdg={bdg1}
            bdgTxtSrc={bdg1TxtSrc}
            bdgIcnSrc={bdg1IcnSrc}
          />
          <CapStkBadge
            bdg={bdg2}
            bdgTxtSrc={bdg2TxtSrc}
            bdgIcnSrc={bdg2IcnSrc}
          />
          <CapStkBadge
            bdg={bdg3}
            bdgTxtSrc={bdg3TxtSrc}
            bdgIcnSrc={bdg3IcnSrc}
          />
        </_Builtin.Block>
      ) : null}
      <ImageGroup
        imgGrp={imgGrp}
        img1Src={img1Src}
        img2Src={img2Src}
        img2={img2}
        img3Src={img3Src}
        img3={img3}
        img4={img4}
        img5={img5}
        img4Src={img4Src}
        img5Src={img5Src}
        imgGrpSz={imgGrpSz}
      />
    </_Component>
  ) : null;
}
