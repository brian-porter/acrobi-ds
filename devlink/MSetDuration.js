"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { SecHead } from "./SecHead";
import { PickDuration } from "./PickDuration";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MSetDuration.module.css";

export function MSetDuration({
  as: _Component = _Builtin.Block,
  clearClick = {},
  prevClick = {},
  hr = "00 hours,",
  min = "00 minutes",
  hr1Active = "true",
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
  hr13Active = "false",
  hr13Click = {},
  hr14Active = "false",
  hr14Click = {},
  hr15Active = "false",
  hr15Click = {},
  hr16Active = "false",
  hr16Click = {},
  hr17Active = "false",
  hr17Click = {},
  hr18Active = "false",
  hr18Click = {},
  hr19Active = "false",
  hr19Click = {},
  hr20Active = "false",
  hr20Click = {},
  hr21Active = "false",
  hr21Click = {},
  hr22Active = "false",
  hr22Click = {},
  hr23Active = "false",
  hr23Click = {},
  hr24Active = "false",
  hr24Click = {},
  min0Active = "true",
  min0KClick = {},
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
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-setduration")}
      tag="section"
      id="duration"
    >
      <HeroStack
        headlineSrc="Duration"
        subtxtSrc=""
        icnSrc="cal_period"
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
        <PickDuration
          hr={hr}
          min={min}
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
          hr13Active={hr13Active}
          hr13Click={hr13Click}
          hr14Active={hr14Active}
          hr14Click={hr14Click}
          hr15Active={hr15Active}
          hr15Click={hr15Click}
          hr16Active={hr16Active}
          hr16Click={hr16Click}
          hr17Active={hr17Active}
          hr17Click={hr17Click}
          hr18Active={hr18Active}
          hr18Click={hr18Click}
          hr19Active={hr19Active}
          hr19Click={hr19Click}
          hr20Active={hr20Active}
          hr20Click={hr20Click}
          hr21Active={hr21Active}
          hr21Click={hr21Click}
          hr22Active={hr22Active}
          hr22Click={hr22Click}
          hr23Active={hr23Active}
          hr23Click={hr23Click}
          hr24Active={hr24Active}
          hr24Click={hr24Click}
          min0Active={min0Active}
          min0KClick={min0KClick}
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
        />
        <Spacer szDep="16" size="16" />
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
