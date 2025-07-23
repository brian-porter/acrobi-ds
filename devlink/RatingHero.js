"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Rating } from "./Rating";
import { Progress } from "./Progress";
import * as _utils from "./utils";
import _styles from "./RatingHero.module.css";

export function RatingHero({
  as: _Component = _Builtin.Block,
  rateAvgValue = "4.6",
  rateQty = "3456",
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
  bar1Qty = {},
  bar2Qty = {},
  bar3Qty = {},
  bar4Qty = {},
  bar5Qty = {},
  bar1Click = {},
  bar2Click = {},
  bar3Click = {},
  bar4Click = {},
  bar5Click = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "rating-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "rating-score")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "h1")} tag="div" id="qty">
          {rateAvgValue}
        </_Builtin.Block>
        <Rating
          r1Full={r1Full}
          r1Half={r1Half}
          r2Full={r2Full}
          r2Half={r2Half}
          r3Full={r3Full}
          r3Half={r3Half}
          r4Full={r4Full}
          r4Half={r4Half}
          r5Full={r5Full}
          r5Half={r5Half}
          value={false}
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "rating-reviews")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "r4", "u-text-n500")}
            tag="div"
            id="qty"
          >
            {rateQty}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "r4", "u-text-n500")}
            tag="div"
            id="qty"
          >
            {"reviews"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rating-bar-collection")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rating-bar")}
          tag="div"
          {...bar5Click}
        >
          <Progress barValue={bar5Qty} />
          <_Builtin.Block
            className={_utils.cx(_styles, "r4")}
            tag="div"
            fs-rangeslider-element="display-value"
          >
            {"5"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rating-bar")}
          tag="div"
          {...bar4Click}
        >
          <Progress barValue={bar4Qty} />
          <_Builtin.Block
            className={_utils.cx(_styles, "r4")}
            tag="div"
            fs-rangeslider-element="display-value"
          >
            {"4"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rating-bar")}
          tag="div"
          {...bar3Click}
        >
          <Progress barValue={bar3Qty} />
          <_Builtin.Block
            className={_utils.cx(_styles, "r4")}
            tag="div"
            fs-rangeslider-element="display-value"
          >
            {"3"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rating-bar")}
          tag="div"
          {...bar2Click}
        >
          <Progress barValue={bar2Qty} />
          <_Builtin.Block
            className={_utils.cx(_styles, "r4")}
            tag="div"
            fs-rangeslider-element="display-value"
          >
            {"2"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rating-bar")}
          tag="div"
          {...bar1Click}
        >
          <Progress barValue={bar1Qty} />
          <_Builtin.Block
            className={_utils.cx(_styles, "r4")}
            tag="div"
            fs-rangeslider-element="display-value"
          >
            {"1"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
