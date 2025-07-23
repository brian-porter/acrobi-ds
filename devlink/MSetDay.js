"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { SecHead } from "./SecHead";
import { PickMonth } from "./PickMonth";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MSetDay.module.css";

export function MSetDay({
  as: _Component = _Builtin.Block,
  clearClick = {},
  month = "Month",
  year = "202X",
  prevClick = {},
  monthClick = {},
  nextClick = {},
  dayMap,
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-set-time")}
      tag="section"
      id="day"
    >
      <HeroStack
        headlineSrc="Day"
        subtxtSrc=""
        icnSrc="cal_set"
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
        <PickMonth
          month={month}
          year={year}
          prevClick={prevClick}
          monthClick={monthClick}
          nextClick={nextClick}
          dayMap={dayMap}
        />
        <Spacer size="16" />
        <ButtonPanel
          btn1Click={doClick}
          btn1TxtSrc="Done"
          btn2={false}
          btn3={false}
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
