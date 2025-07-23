"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Spacer } from "./Spacer";
import { Img } from "./Img";
import { Headline } from "./Headline";
import { Paragraph } from "./Paragraph";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./3XCell.module.css";

export function __3XCell({
  as: _Component = _Builtin.Block,
  img = true,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/67e87a7e9174953180857a14_placeholder.svg",
  imgAlt = "__wf_reserved_inherit",
  titleSrc = "Title",
  subtxt = true,
  subtxtSrc = "Sub-text",
  subtxtSz = "r2b",
  pgrph = true,
  pgrphSrc = "A paragraph of body copy to support the title and image goes here. Use up to three lines of copy.",
  btn = false,
  btnTxtSrc = "Learn More",
  drpShdw,
  buttonBtnStyl = "pt",

  buttonBtnLink = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "_3x-cell")}
      tag="div"
      data-bs={drpShdw}
    >
      <_Builtin.Block className={_utils.cx(_styles, "flex-hl")} tag="div">
        {img ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-105")}
            tag="div"
          >
            <Spacer size="16" />
            <Img imgSrc={imgSrc} imgAlt={imgAlt} imgSz="l" />
          </_Builtin.Block>
        ) : null}
        <Headline
          titleSrc={titleSrc}
          subtxtSrc={subtxtSrc}
          subtxt={subtxt}
          subtxtSz={subtxtSz}
          titleAlign="l"
          subtxtAlign="l"
          titleSz="h4b"
          subtxtLh=""
          subtxtLc="3"
        />
      </_Builtin.Block>
      <Spacer size="8" />
      <Paragraph
        bodySrc={pgrphSrc}
        pgrph={pgrph}
        fontSz="r2"
        fontClr="n900"
        align="l"
      />
      {btn ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "btn-cell-pad")}
          tag="div"
        >
          <Button
            btnTxtSrc={btnTxtSrc}
            btnStyl={buttonBtnStyl}
            btnLink={buttonBtnLink}
            btnIcnLoc="r"
            btnIcnSrc="nav_right"
            btnSz="s"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
