"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Headline } from "./Headline";
import * as _utils from "./utils";
import _styles from "./SecBillboardHead.module.css";

export function SecBillboardHead({
  as: _Component = _Builtin.Block,
  sec = true,
  con = true,
  conVizDeskSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/67c77643fb90edd656d49dca_12col.webp",
  conVizMoSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/67c7765e80938bc5e372a686_mobile.webp",
  conVizAlt = "__wf_reserved_inherit",
  conVizDeskAsp,
  conVizMoAsp,
  conCopyW = "33",
  conCopyLoc,
  conTitleSrc = "SectionTitle",
  conSubtxt = false,
  conSubtxtSrc = "Section subtext goes here and line wraps",
  conAlign = "l",
  conTitleSz = "h3b",
  conTitleClr = "n900",
  conSubtxtSz = "r3",
  conSubtxtClr = "n900",
  conTopHero,

  conSecLink = {
    href: "#",
    preload: "none",
  },

  conSecClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "section-billboard")}
      tag="section"
      {...conSecClick}
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "link-block")}
        button={false}
        block="inline"
        options={conSecLink}
      />
      <_Builtin.Block className={_utils.cx(_styles, "bb-bg")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "img-desktop")}
          loading="lazy"
          width="auto"
          height="Auto"
          data-obj-asp={conVizDeskAsp}
          src={conVizDeskSrc}
        />
        <_Builtin.Image
          className={_utils.cx(_styles, "img-mobile")}
          loading="lazy"
          width="auto"
          height="auto"
          data-obj-asp={conVizMoAsp}
          src={conVizMoSrc}
        />
        {con ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "bb-content")}
            tag="div"
            data-width={conCopyW}
            data-obj-loc={conCopyLoc}
          >
            <Headline
              subtxt={conSubtxt}
              titleSz={conTitleSz}
              titleSrc={conTitleSrc}
              titleClr={conTitleClr}
              subtxtClr={conSubtxtClr}
              subtxtSrc={conSubtxtSrc}
              subtxtSz={conSubtxtSz}
              titleAlign={conAlign}
              subtxtAlign={conAlign}
              titleShdw="y"
              titleLh="lh6"
              subtxtLh="lh4"
              subtxtLc=""
              comp={true}
              subTxtShdw="y"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
