"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { SecHead } from "./SecHead";
import { PickRepeat } from "./PickRepeat";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MSetRepeat.module.css";

export function MSetRepeat({
  as: _Component = _Builtin.Block,
  clearClick = {},
  qty = "Every XX",
  type = "Days",
  prevClick = {},
  _1Active = "true",
  _1Click = {},
  _2Active = "false",
  _2Click = {},
  _3Active = "false",
  _3Click = {},
  _4Active = "false",
  _4Click = {},
  _5Active = "false",
  _5Click = {},
  _6Active = "false",
  _6Click = {},
  _7Active = "false",
  _7Click = {},
  _8Active = "false",
  _8Click = {},
  _9Active = "false",
  _9Click = {},
  _10Active = "false",
  _10Click = {},
  _11Active = "false",
  _11Click = {},
  _12Active = "false",
  _12Click = {},
  _13Active = "false",
  _13Click = {},
  _14Active = "false",
  _14Click = {},
  _15Active = "false",
  _15Click = {},
  _16Active = "false",
  _16Click = {},
  _17Active = "false",
  _17Click = {},
  _18Active = "false",
  _18Click = {},
  _19Active = "false",
  _19Click = {},
  _20Active = "false",
  _20Click = {},
  _21Active = "false",
  _21Click = {},
  _22Active = "false",
  _22Click = {},
  _23Active = "false",
  _23Click = {},
  _24Active = "false",
  _24Click = {},
  _25Active = "false",
  _25Click = {},
  _26Active = "false",
  _26Click = {},
  _27Active = "false",
  _27Click = {},
  _28Active = "false",
  _28Click = {},
  _29Active = "false",
  _29Click = {},
  _30Active = "false",
  _30Click = {},
  dayActive = "true",
  dayClick = {},
  weekActive = "false",
  weekClick = {},
  monthActive = "false",
  monthClick = {},
  yearActive = "false",
  yearClick = {},
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-setrepeat")}
      tag="section"
      id="repeat"
    >
      <HeroStack
        headlineSrc="Repeat"
        subtxtSrc=""
        icnSrc="act_repeat"
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
        <PickRepeat
          qty={qty}
          type={type}
          prevClick={prevClick}
          _1Active={_1Active}
          _1Click={_1Click}
          _2Active={_2Active}
          _2Click={_2Click}
          _3Active={_3Active}
          _3Click={_3Click}
          _4Active={_4Active}
          _4Click={_4Click}
          _5Active={_5Active}
          _5Click={_5Click}
          _6Active={_6Active}
          _6Click={_6Click}
          _7Active={_7Active}
          _7Click={_7Click}
          _8Active={_8Active}
          _8Click={_8Click}
          _9Active={_9Active}
          _9Click={_9Click}
          _10Active={_10Active}
          _10Click={_10Click}
          _11Active={_11Active}
          _11Click={_11Click}
          _12Active={_12Active}
          _12Click={_12Click}
          _13Active={_13Active}
          _13Click={_13Click}
          _14Active={_14Active}
          _14Click={_14Click}
          _15Active={_15Active}
          _15Click={_15Click}
          _16Active={_16Active}
          _16Click={_16Click}
          _17Active={_17Active}
          _17Click={_17Click}
          _18Active={_18Active}
          _18Click={_18Click}
          _19Active={_19Active}
          _19Click={_19Click}
          _20Active={_20Active}
          _20Click={_20Click}
          _21Active={_21Active}
          _21Click={_21Click}
          _22Active={_22Active}
          _22Click={_22Click}
          _23Active={_23Active}
          _23Click={_23Click}
          _24Active={_24Active}
          _24Click={_24Click}
          _25Active={_25Active}
          _25Click={_25Click}
          _26Active={_26Active}
          _26Click={_26Click}
          _27Active={_27Active}
          _27Click={_27Click}
          _28Active={_28Active}
          _28Click={_28Click}
          _29Active={_29Active}
          _29Click={_29Click}
          _30Active={_30Active}
          _30Click={_30Click}
          dayActive={dayActive}
          dayClick={dayClick}
          weekActive={weekActive}
          weekClick={weekClick}
          monthActive={monthActive}
          monthClick={monthClick}
          yearActive={yearActive}
          yearClick={yearClick}
        />
        <Spacer szDep="64" size="64" />
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
