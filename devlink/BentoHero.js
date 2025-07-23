"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlHeadline } from "./OlHeadline";
import { OlBtn } from "./OlBtn";
import * as _utils from "./utils";
import _styles from "./BentoHero.module.css";

export function BentoHero({
  as: _Component = _Builtin.Block,
  bentoImg = "",
  hlineTitleSrc = "SecName",
  hlineAlign = "l",
}) {
  return (
    <_Component className={_utils.cx(_styles, "bento-hero")} tag="div">
      <_Builtin.Image
        className={_utils.cx(_styles, "image-7")}
        loading="lazy"
        width="auto"
        height="auto"
        alt=""
        src={bentoImg}
      />
      <_Builtin.Link
        className={_utils.cx(_styles, "bento-cell-link")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      />
      <OlHeadline
        hlineTitleSrc={hlineTitleSrc}
        hlineAlign={hlineAlign}
        hlineSz="l"
      />
      <OlBtn btnTxtSrc="Deals" btnIcnSrc="offer_f" btnTxt={true} btn={false} />
    </_Component>
  );
}
