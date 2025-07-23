"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./OlTag.module.css";

export function OlTag({
  as: _Component = _Builtin.Block,
  tag = false,
  tagClr = "p500",
  tagSz = "m",
  tagLoc = "tr",
  tagTxt = true,
  tagTxtSrc = "3",
  tagIcn = false,
  tagIcnSrc = "Default",
}) {
  return tag ? (
    <_Component
      className={_utils.cx(_styles, "ol_tag")}
      tag="div"
      data-tag-size={tagSz}
      data-tag-loc={tagLoc}
      data-bg-clr={tagClr}
    >
      <Label
        txtSrc={tagTxtSrc}
        icnSrc={tagIcnSrc}
        txt={tagTxt}
        icn={tagIcn}
        lblSz="r4"
        lblClr="n000"
      />
    </_Component>
  ) : null;
}
