"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { SecHead } from "./SecHead";
import { PickYr } from "./PickYr";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MSetYear.module.css";

export function MSetYear({
  as: _Component = _Builtin.Block,
  clearClick = {},
  prev = true,
  prevClick = {},
  next = false,
  nextClick = {},
  yrMap,
  yr = "XXXX",
  yrActive = "false",
  yrClick = {},
  backClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-setyr")}
      tag="section"
      id="year"
    >
      <HeroStack
        headlineSrc="Year"
        subtxtSrc=""
        icnSrc="cal_year"
        icn={true}
        img={false}
        subtxt={false}
      />
      <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
        <SecHead
          act1Click={clearClick}
          titleSrc=""
          sz="xs"
          act1TxtSrc="Clear"
        />
        <PickYr
          prevClick={prevClick}
          prev={prev}
          next={next}
          nextClick={nextClick}
          yr={yr}
          yrActive={yrActive}
          yrClick={yrClick}
          yrMap={yrMap}
        />
        <Spacer szDep="64" size="64" />
        <ButtonPanel
          btn1Click={backClick}
          btn1TxtSrc="Back"
          btn2={false}
          btn3={false}
          btn1Icn={false}
          btn1Styl="pl"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
