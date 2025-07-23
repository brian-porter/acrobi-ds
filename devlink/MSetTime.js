"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { SecHead } from "./SecHead";
import { PickTime } from "./PickTime";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MSetTime.module.css";

export function MSetTime({
  as: _Component = _Builtin.Block,
  clearClick = {},
  time = "00:00",
  amPm = "PM",
  prevClick = {},
  hr1Active = "false",
  hr1Click = {},
  hr2Active = "false",
  hr2Click = {},
  hr3Active = "false",
  hr3Click = {},
  hr4Active = "false",
  hr4Click = {},
  hr5Active = "false",
  hr5Click = {},
  hr6Active = "false",
  hr6Click = {},
  hr7Active = "false",
  hr7Click = {},
  hr8Active = "false",
  hr8Click = {},
  hr9Active = "false",
  hr9Click = {},
  hr10Active = "false",
  hr10Click = {},
  hr11Active = "false",
  hr11Click = {},
  hr12Active = "false",
  hr12Click = {},
  min0Active = "true",
  min0Click = {},
  min5Active = "false",
  min5Click = {},
  min10Active = "false",
  min10Click = {},
  min15Active = "false",
  min15Click = {},
  min20Active = "false",
  min20Click = {},
  min25Active = "false",
  min25Click = {},
  min30Active = "false",
  min30Click = {},
  min35Active = "false",
  min35Click = {},
  min40Active = "false",
  min40Click = {},
  min45Active = "false",
  min45Click = {},
  min50Active = "false",
  min50Click = {},
  min55Active = "false",
  min55Click = {},
  amActive = "false",
  amClick = {},
  pmActive = "true",
  pmClick = {},
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-settime")}
      tag="section"
      id="time"
    >
      <HeroStack
        headlineSrc="Time"
        subtxtSrc=""
        icnSrc="cal_time"
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
        <PickTime
          time={time}
          amPm={amPm}
          prevClick={prevClick}
          hr1Active={hr1Active}
          hr1Click={hr1Click}
          hr2Active={hr2Active}
          hr2Click={hr2Click}
          hr3Active={hr3Active}
          hr3Click={hr3Click}
          hr4Active={hr4Active}
          hr4Click={hr4Click}
          hr5Active={hr5Active}
          hr5Click={hr5Click}
          hr6Active={hr6Active}
          hr6Click={hr6Click}
          hr7Active={hr7Active}
          hr7Click={hr7Click}
          hr8Active={hr8Active}
          hr8Click={hr8Click}
          hr9Active={hr9Active}
          hr9Click={hr9Click}
          hr10Active={hr10Active}
          hr10Click={hr10Click}
          hr11Active={hr11Active}
          hr11Click={hr11Click}
          hr12Active={hr12Active}
          hr12Click={hr12Click}
          min0Active={min0Active}
          min0Click={min0Click}
          min5Active={min5Active}
          min5Click={min5Click}
          min10Active={min10Active}
          min10Click={min10Click}
          min15Active={min15Active}
          min15Click={min15Click}
          min20Active={min20Active}
          min20Click={min20Click}
          min25Active={min25Active}
          min25Click={min25Click}
          min30Active={min30Active}
          min30Click={min30Click}
          min35Active={min35Active}
          min35Click={min35Click}
          min40Active={min40Active}
          min40Click={min40Click}
          min45Active={min45Active}
          min45Click={min45Click}
          min50Active={min50Active}
          min50Click={min50Click}
          min55Active={min55Active}
          min55Click={min55Click}
          amActive={amActive}
          amClick={amClick}
          pmActive={pmActive}
          pmClick={pmClick}
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
