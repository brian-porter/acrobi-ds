"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./MGroupList.module.css";

export function MGroupList({
  as: _Component = _Builtin.Block,
  groupMap,
  exampleGroup = true,
  groupActv = false,
  groupTag = false,
  groupImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  groupImgAlt = "__wf_reserved_inherit",
  groupTagTxtSrc = "1",
  groupClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "bar-vertscroll")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "u-barbtngap-vs")}
        tag="div"
      >
        {groupMap ?? (
          <Cell
            cell={exampleGroup}
            cellActv={groupActv}
            cellClick={groupClick}
            imgImgSrc={groupImgSrc}
            imgImgAlt={groupImgAlt}
            imgImgTag={groupTag}
            imgImgTagTxtSrc={groupTagTxtSrc}
            cellSz="l"
            captionCapStk={true}
            capStkRow1Src="Name"
            caption={false}
            imgImgAct={false}
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "side-fade-t")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "side-fade-b")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
