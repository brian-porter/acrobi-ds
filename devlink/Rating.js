"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { RatePoint } from "./RatePoint";
import * as _utils from "./utils";
import _styles from "./Rating.module.css";

export function Rating({
  as: _Component = _Builtin.Block,
  rating = true,
  r1Full = false,
  r1Half = false,
  r2Full = false,
  r2Half = false,
  r3Full = false,
  r3Half = false,
  r4Full = false,
  r4Half = false,
  r5Full = false,
  r5Half = false,
  value = true,
  qty = false,
  valueSrc = "0",
  qtySrc = "0",
  stack = "n",
  sz = "m",
}) {
  return rating ? (
    <_Component
      className={_utils.cx(_styles, "rating_contain")}
      tag="div"
      data-rate-stack={stack}
      data-rate-size={sz}
    >
      <_Builtin.Block className={_utils.cx(_styles, "rating_scale")} tag="div">
        <RatePoint full={r1Full} half={r1Half} />
        <RatePoint full={r2Full} half={r2Half} />
        <RatePoint full={r3Full} half={r3Half} />
        <RatePoint full={r4Full} half={r4Half} />
        <RatePoint full={r5Full} half={r5Half} />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "rating-copy")} tag="div">
        {value ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "rating-val")}
            tag="div"
            id="rating"
          >
            {valueSrc}
          </_Builtin.Block>
        ) : null}
        {qty ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "rating-qty-contain")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "rating-qty-div")}
              tag="div"
            >
              {"|"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "rating-qty")}
              tag="div"
            >
              {qtySrc}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%0A.rating_contain%5Bdata-rate-size%3D%22xs%22%5D%20*%2C%0A.rate_bg%2C%0A.rate_half%2C%0A.rate_on%20%7B%0A%20%20font-size%3A%20.5rem%3B%0A%7D%0A.rating_contain%5Bdata-rate-size%3D%22s%22%5D%20*%2C%0A.rate_bg%2C%0A.rate_half%2C%0A.rate_on%20%7B%0A%20%20font-size%3A%20.75rem%3B%0A%7D%0A.rating_contain%5Bdata-rate-size%3D%22m%22%5D%20*%2C%0A.rate_bg%2C%0A.rate_half%2C%0A.rate_on%20%7B%0A%20%20font-size%3A%201.0rem%3B%0A%7D%0A.rating_contain%5Bdata-rate-size%3D%22l%22%5D%20*%2C%0A.rate_bg%2C%0A.rate_half%2C%0A.rate_on%20%7B%0A%20%20font-size%3A%201.5rem%3B%0A%7D%0A.rating_contain%5Bdata-rate-size%3D%22xl%22%5D%20*%2C%0A.rate_bg%2C%0A.rate_half%2C%0A.rate_on%20%7B%0A%20%20font-size%3A%202.0rem%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  ) : null;
}
