"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { SecHead } from "./SecHead";
import { MenuItem } from "./MenuItem";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MSetDate.module.css";

export function MSetDate({
  as: _Component = _Builtin.Block,
  clearClick = {},
  dayValue = "{today}",
  dayClick = {},
  timeValue = "{now+}",
  timeClick = {},
  durValue = "{1 hr}",
  durClick = {},
  repValue = "{freq.}",
  repClick = {},
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-setdate")}
      tag="section"
      id="date"
    >
      <HeroStack
        headlineSrc="Set a Date"
        subtxtSrc="Tie events to a specific time to let others receive notifications"
        icnSrc="cal_sched"
        icn={true}
        img={false}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        data-bs=""
      >
        <SecHead
          act1Click={clearClick}
          titleSrc="Settings"
          sz="xs"
          act1TxtSrc="Clear All"
        />
        <MenuItem
          tValueSrc={dayValue}
          menuItmClick={dayClick}
          lIcn={true}
          tValue={true}
          lIcnSrc="cal"
          pTitleSrc="Day"
        />
        <MenuItem
          tValueSrc={timeValue}
          menuItmClick={timeClick}
          lIcn={true}
          tValue={true}
          pTitleSrc="Time"
          lIcnSrc="cal_time"
        />
        <MenuItem
          tValueSrc={durValue}
          menuItmClick={durClick}
          lIcn={true}
          tValue={true}
          lIcnSrc="cal_period"
          pTitleSrc="Duration"
        />
        <MenuItem
          tValueSrc={repValue}
          menuItmClick={repClick}
          lIcn={true}
          tValue={true}
          lIcnSrc="repeat"
          pTitleSrc="Repeat"
          pItmDiv=""
          tItmDiv=""
        />
        <Spacer szDep="24" size="24" />
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
