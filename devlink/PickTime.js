"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickHead } from "./PickHead";
import { PickSubCell } from "./PickSubCell";
import { PickPoint } from "./PickPoint";
import * as _utils from "./utils";
import _styles from "./PickTime.module.css";

export function PickTime({
  as: _Component = _Builtin.Block,
  time = "00:00",
  amPm = "PM",

  prevLink = {
    href: "#",
  },

  prevClick = {},
  periods = true,
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
}) {
  return (
    <_Component className={_utils.cx(_styles, "picktime")} tag="div">
      <PickHead
        leadLbl={time}
        trailLbl={amPm}
        prevLink={prevLink}
        prevClick={prevClick}
        prev={true}
        next={false}
      />
      <_Builtin.Block className={_utils.cx(_styles, "pick-3col")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "pick-1col")} tag="div">
          <PickSubCell />
          <_Builtin.Grid
            className={_utils.cx(_styles, "pickgrid-2col")}
            tag="div"
          >
            <PickPoint
              pickClick={hr1Click}
              pickActive={hr1Active}
              pickValueSrc="1"
            />
            <PickPoint
              pickClick={hr2Click}
              pickActive={hr2Active}
              pickValueSrc="2"
            />
            <PickPoint
              pickClick={hr3Click}
              pickActive={hr3Active}
              pickValueSrc="3"
            />
            <PickPoint
              pickClick={hr4Click}
              pickActive={hr4Active}
              pickValueSrc="4"
            />
            <PickPoint
              pickClick={hr5Click}
              pickActive={hr5Active}
              pickValueSrc="5"
            />
            <PickPoint
              pickClick={hr6Click}
              pickActive={hr6Active}
              pickValueSrc="6"
            />
            <PickPoint
              pickClick={hr7Click}
              pickActive={hr7Active}
              pickValueSrc="7"
            />
            <PickPoint
              pickClick={hr8Click}
              pickActive={hr8Active}
              pickValueSrc="8"
            />
            <PickPoint
              pickClick={hr9Click}
              pickActive={hr9Active}
              pickValueSrc="9"
            />
            <PickPoint
              pickClick={hr10Click}
              pickActive={hr10Active}
              pickValueSrc="10"
            />
            <PickPoint
              pickClick={hr11Click}
              pickActive={hr11Active}
              pickValueSrc="11"
            />
            <PickPoint
              pickClick={hr12Click}
              pickActive={hr12Active}
              pickValueSrc="12"
            />
          </_Builtin.Grid>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "pick-1col")} tag="div">
          <PickSubCell cellSrc="Minute" />
          <_Builtin.Grid
            className={_utils.cx(_styles, "pickgrid-2col")}
            tag="div"
          >
            <PickPoint
              pickClick={min0Click}
              pickActive={min0Active}
              pickValueSrc=":00"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min5Click}
              pickActive={min5Active}
              pickValueSrc=":05"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min10Click}
              pickActive={min10Active}
              pickValueSrc=":10"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min15Click}
              pickActive={min15Active}
              pickValueSrc=":15"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min20Click}
              pickActive={min20Active}
              pickValueSrc=":20"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min25Click}
              pickActive={min25Active}
              pickValueSrc=":25"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min30Click}
              pickActive={min30Active}
              pickValueSrc=":30"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min35Click}
              pickActive={min35Active}
              pickValueSrc=":35"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min40Click}
              pickActive={min40Active}
              pickValueSrc=":40"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min45Click}
              pickActive={min45Active}
              pickValueSrc=":45"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min50Click}
              pickActive={min50Active}
              pickValueSrc=":50"
              pickCurrent=""
            />
            <PickPoint
              pickClick={min55Click}
              pickActive={min55Active}
              pickValueSrc=":55"
              pickCurrent=""
            />
          </_Builtin.Grid>
        </_Builtin.Block>
        {periods ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "pick-1col")}
            id={_utils.cx(
              _styles,
              "w-node-e626cbcc-b22d-2e58-f22c-634d2122382d-2122380c"
            )}
            tag="div"
          >
            <PickSubCell cellSrc="Period" />
            <_Builtin.Block
              className={_utils.cx(_styles, "pick-1col")}
              tag="div"
            >
              <PickPoint
                pickClick={amClick}
                pickActive={amActive}
                pickValueSrc="AM"
                pickCurrent=""
              />
              <PickPoint
                pickClick={pmClick}
                pickActive={pmActive}
                pickValueSrc="PM"
                pickCurrent=""
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
