"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlHeadline } from "./OlHeadline";
import { OlBtn } from "./OlBtn";
import * as _utils from "./utils";
import _styles from "./BentoImg.module.css";

export function BentoImg({
  as: _Component = _Builtin.Block,
  hline = true,
  hlineSubtxt = true,
  btn = true,
  btnIcn = false,
  btnTxt = true,
  img = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/64f2252063958ea183fb7cf1_placeholder-image.svg",
  imgAlt,
  hlineTitleSrc = "Headline goes here",
  hlineSubtxtSrc = "Subtext goes here",
  hlineLoc = "btm",
  hlineSz = "l",
  hlineAlign = "l",
  btnIcnSrc = "act_edit_f",
  btnTxtSrc = "Join",
  btnLoc = "br",
  btnClick = {},
  bentoClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "bento-img")}
      tag="div"
      {...bentoClick}
    >
      <OlHeadline
        hlineSubtxt={hlineSubtxt}
        hlineSubtxtSrc={hlineSubtxtSrc}
        hlineSz={hlineSz}
        hlineLoc={hlineLoc}
        hline={hline}
        hlineTitleSrc={hlineTitleSrc}
        hlineAlign={hlineAlign}
      />
      <OlBtn
        btnLoc={btnLoc}
        btnTxt={btnTxt}
        btnTxtSrc={btnTxtSrc}
        btnIcn={btnIcn}
        btn={btn}
        btnIcnSrc={btnIcnSrc}
        btnClick={btnClick}
      />
      <_Builtin.Image
        className={_utils.cx(_styles, "img-bento")}
        loading="lazy"
        width="auto"
        height="auto"
        src={img}
      />
    </_Component>
  );
}
