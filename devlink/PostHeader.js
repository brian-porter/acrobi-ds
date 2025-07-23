"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Img } from "./Img";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PostHeader.module.css";

export function PostHeader({
  as: _Component = _Builtin.Block,
  header = false,
  hdrSubtxt = false,
  hdrImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  hdrImgAlt = "__wf_reserved_inherit",
  hdrTitleSrc = "PostSubject",
  hdrSubtxtSrc = "post subtxt goes here, address",
  hdrImgSz = "l",
  hdrTitleSz = "r2",
  hdrTitleClr = "in",
  hdrSubtxtSz = "r4",
  hdrSubtxtClr = "n700",
}) {
  return header ? (
    <_Component className={_utils.cx(_styles, "post-header")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "post-primary-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "post-lead-img")}
          tag="div"
        >
          <Img
            imgSrc={hdrImgSrc}
            imgSz={hdrImgSz}
            imgAlt={hdrImgAlt}
            imgShape="r"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "post-primary")}
          tag="div"
          data-btm-brdr=""
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "post-prime-titlesubtxt")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "post-prime-title")}
              tag="div"
              data-fs={hdrTitleSz}
              data-clr={hdrTitleClr}
              data-lc="1"
            >
              {hdrTitleSrc}
            </_Builtin.Block>
            {hdrSubtxt ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "post-prime-subtxt")}
                tag="div"
                data-fs={hdrSubtxtSz}
                data-clr={hdrSubtxtClr}
                data-lc="1"
              >
                {hdrSubtxtSrc}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
