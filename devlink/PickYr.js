"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickHead } from "./PickHead";
import { PickPoint } from "./PickPoint";
import * as _utils from "./utils";
import _styles from "./PickYr.module.css";

export function PickYr({
  as: _Component = _Builtin.Block,
  prev = true,
  prevClick = {},
  next = false,
  nextClick = {},
  yrMap,
  yr = "XXXX",
  yrActive = "false",
  yrClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "pickyr")} tag="div">
      <PickHead
        prev={prev}
        next={next}
        prevClick={prevClick}
        nextClick={nextClick}
        leadLbl={yr}
        trailLbl=""
        prevLink={{
          href: "#",
        }}
      />
      <_Builtin.Grid className={_utils.cx(_styles, "pickgrid-5col")} tag="div">
        {yrMap ?? (
          <PickPoint
            pickClick={yrClick}
            pickActive={yrActive}
            pickValueSrc="XXXX"
          />
        )}
      </_Builtin.Grid>
    </_Component>
  );
}
