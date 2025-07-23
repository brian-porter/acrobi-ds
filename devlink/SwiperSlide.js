"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Img } from "./Img";
import * as _utils from "./utils";
import _styles from "./SwiperSlide.module.css";

export function SwiperSlide({
  as: _Component = _Builtin.Block,
  exampleSlideViz = true,
  cellMap,
  exampleSlide = true,
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  vizAlt = "__wf_reserved_inherit",
}) {
  return exampleSlide ? (
    <_Component className={_utils.cx(_styles, "swiper-slide")} tag="div">
      {cellMap ?? (
        <Img
          img={exampleSlideViz}
          imgSrc={vizSrc}
          imgAlt={vizAlt}
          imgSz="auto"
        />
      )}
    </_Component>
  ) : null;
}
