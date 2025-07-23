"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlTag } from "./OlTag";
import { OlBannerFull } from "./OlBannerFull";
import * as _utils from "./utils";
import _styles from "./CellCategory.module.css";

export function CellCategory({
  as: _Component = _Builtin.Block,
  cell = true,
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  vizAlt = "__wf_reserved_inherit",
  vizSz,
  vizAsp = "21-9",
  vizShape = "r",
  lblTxtSrc = "CategoryName",
  lblTxtSz = "r2",
  tag = false,
  tagTxtSrc = "3",
  tagClr = "p500",
  tagSz = "l",
  tagLoc = "tr",
  cellClick = {},
}) {
  return cell ? (
    <_Component
      className={_utils.cx(_styles, "cat_wrap")}
      tag="div"
      data-shape={vizShape}
      data-cell-size={vizSz}
      {...cellClick}
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "img")}
        width="Auto"
        height="Auto"
        loading="lazy"
        data-obj-size="5xl"
        data-obj-shape="b"
        data-obj-asp={vizAsp}
        src={vizSrc}
      />
      <OlTag
        tag={tag}
        tagTxtSrc={tagTxtSrc}
        tagLoc={tagLoc}
        tagSz={tagSz}
        tagClr={tagClr}
      />
      <OlBannerFull
        lblSz={lblTxtSz}
        lblTxtSrc={lblTxtSrc}
        bnr={true}
        bnrLoc="btm"
        bnrContAlign="sb"
        avtrGrp={false}
        avtrSz="xs"
        avtr1Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        avtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        avtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        avtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        avtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        avtr3={false}
        avtr4={false}
        avtr5={false}
        lbl={true}
        lblTxt={true}
        lblIcn={false}
        lblIcnSrc="Default"
        lblIcnLoc="r"
        avtr2={false}
      />
    </_Component>
  ) : null;
}
