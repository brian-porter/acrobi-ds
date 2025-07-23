"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SwiperSlide } from "./SwiperSlide";
import * as _utils from "./utils";
import _styles from "./Swiper.module.css";

export function Swiper({
  as: _Component = _Builtin.Block,
  swiper = true,
  slideMap,
  exampleSlide = true,
  slideDetailMap,
  exampleSlideDetail = true,
  swipVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  swipVizAlt = "__wf_reserved_inherit",
}) {
  return swiper ? (
    <_Component className={_utils.cx(_styles, "swiper")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "read-me")}
        value="%3C!--%20**********%0ANote%3A%20We%20will%20use%20a%20popular%20NPM%20project%20called%20Swiper%20to%20power%20the%20carousel%20component.%0Ahttps%3A%2F%2Fgithub.com%2Fnolimits4web%2FSwiper%0A**********%20--%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "swiper-wrapper")}
        tag="div"
      >
        {slideMap ?? (
          <SwiperSlide
            exampleSlideViz={exampleSlideDetail}
            cellMap={slideDetailMap}
            exampleSlide={exampleSlide}
            vizSrc={swipVizSrc}
            vizAlt={swipVizAlt}
          />
        )}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
