"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ItemHead.module.css";

export function ItemHead({
  as: _Component = _Builtin.Block,
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  name = "ItemName description goes here andline wraps",
}) {
  return itmHead ? (
    <_Component className={_utils.cx(_styles, "item-head")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "item-head-lead")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "img-88")}
          id={_utils.cx(
            _styles,
            "w-node-_8f827fc6-0a01-d50d-ff24-46a88e3dedcb-8e3dedc9"
          )}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "img")}
            loading="lazy"
            width="auto"
            height="auto"
            src={itmImgSrc}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "item-head-primary")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "r4", "u-text-n700")}
          tag="div"
        >
          {name}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
