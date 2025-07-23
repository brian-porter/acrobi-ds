"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Img } from "./Img";
import * as _utils from "./utils";
import _styles from "./ImageGroup.module.css";

export function ImageGroup({
  as: _Component = _Builtin.Block,
  imgGrp = true,
  imgGrpSz = "xs",
  img2 = false,
  img3 = false,
  img4 = false,
  img5 = false,
  img1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img1Alt = "__wf_reserved_inherit",
  img2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img2Alt = "__wf_reserved_inherit",
  img3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img3Alt = "__wf_reserved_inherit",
  img4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img4Alt = "__wf_reserved_inherit",
  img5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  img5Alt = "__wf_reserved_inherit",
}) {
  return imgGrp ? (
    <_Component
      className={_utils.cx(_styles, "img_group")}
      tag="div"
      data-group-size={imgGrpSz}
    >
      <Img img={img5} imgSrc={img5Src} imgAlt={img5Alt} imgGroup="true" />
      <Img img={img4} imgSrc={img4Src} imgAlt={img4Alt} imgGroup="true" />
      <Img img={img3} imgSrc={img3Src} imgAlt={img3Alt} imgGroup="true" />
      <Img img={img2} imgSrc={img2Src} imgAlt={img2Alt} imgGroup="true" />
      <Img imgSrc={img1Src} imgAlt={img1Alt} imgGroup="true" />
    </_Component>
  ) : null;
}
