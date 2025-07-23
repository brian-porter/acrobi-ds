"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AvatarGroup } from "./AvatarGroup";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./OlBannerFull.module.css";

export function OlBannerFull({
  as: _Component = _Builtin.Block,
  bnr = false,
  lbl = true,
  avtrGrp = false,
  bnrLoc = "btm",
  bnrContAlign = "l",
  lblTxt = true,
  lblIcn = false,
  lblTxtSrc = "Label",
  lblIcnSrc = "default",
  lblSz = "r2",
  lblIcnLoc = "l",
  avtr2 = false,
  avtr3 = false,
  avtr4 = false,
  avtr5 = false,
  avtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrSz = "s",
}) {
  return bnr ? (
    <_Component
      className={_utils.cx(_styles, "ol_bnr_full_wrap")}
      tag="div"
      data-bnr-loc={bnrLoc}
      data-cont-align={bnrContAlign}
    >
      <AvatarGroup
        avtr1Src={avtr1Src}
        avtr2Src={avtr2Src}
        avtr3Src={avtr3Src}
        avtr4Src={avtr4Src}
        avtr5Src={avtr5Src}
        avtr3={avtr3}
        avtr4={avtr4}
        avtr5={avtr5}
        avtrSz={avtrSz}
        avtrGrp={avtrGrp}
        avtr2={avtr2}
      />
      <Label
        txtSrc={lblTxtSrc}
        icnLoc={lblIcnLoc}
        lblSz={lblSz}
        icn={lblIcn}
        lbl={lbl}
        icnSrc={lblIcnSrc}
        txt={lblTxt}
      />
    </_Component>
  ) : null;
}
