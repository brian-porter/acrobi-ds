"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickHead } from "./PickHead";
import { PickSubCell } from "./PickSubCell";
import { PickPoint } from "./PickPoint";
import * as _utils from "./utils";
import _styles from "./PickDuration.module.css";

export function PickDuration({
  as: _Component = _Builtin.Block,
  hr = "00 hours,",
  min = "00 minutes",
  prevClick = {},
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
}) {
  return (
    <_Component className={_utils.cx(_styles, "pickduration")} tag="div">
      <PickHead
        leadLbl={hr}
        trailLbl={min}
        prevClick={prevClick}
        prev={true}
        next={false}
      />
      <_Builtin.Block className={_utils.cx(_styles, "pick-4-2col")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "pick-1col")} tag="div">
          <PickSubCell />
          <_Builtin.Grid
            className={_utils.cx(_styles, "pickgrid-4col")}
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
              pickActive={hr6Active}
              pickClick={hr6Click}
              pickValueSrc="6"
            />
            <PickPoint
              pickActive={hr7Active}
              pickClick={hr7Click}
              pickValueSrc="7"
            />
            <PickPoint
              pickClick={hr8Click}
              pickActive={hr8Active}
              pickValueSrc="8"
            />
            <PickPoint
              pickActive={hr9Active}
              pickClick={hr9Click}
              pickValueSrc="9"
            />
            <PickPoint
              pickClick={hr10Click}
              pickActive={hr10Active}
              pickValueSrc="10"
            />
            <PickPoint
              pickActive={hr11Active}
              pickClick={hr11Click}
              pickValueSrc="11"
            />
            <PickPoint
              pickActive={hr12Active}
              pickClick={hr12Click}
              pickValueSrc="12"
            />
            <PickPoint
              pickActive={hr13Active}
              pickClick={hr13Click}
              pickValueSrc="13"
            />
            <PickPoint
              pickActive={hr14Active}
              pickClick={hr14Click}
              pickValueSrc="14"
            />
            <PickPoint
              pickActive={hr15Active}
              pickClick={hr15Click}
              pickValueSrc="15"
            />
            <PickPoint
              pickActive={hr16Active}
              pickClick={hr16Click}
              pickValueSrc="16"
            />
            <PickPoint
              pickActive={hr17Active}
              pickClick={hr17Click}
              pickValueSrc="17"
            />
            <PickPoint
              pickActive={hr18Active}
              pickClick={hr18Click}
              pickValueSrc="18"
            />
            <PickPoint
              pickActive={hr19Active}
              pickClick={hr19Click}
              pickValueSrc="19"
            />
            <PickPoint
              pickClick={hr20Click}
              pickActive={hr20Active}
              pickValueSrc="20"
            />
            <PickPoint
              pickActive={hr21Active}
              pickClick={hr21Click}
              pickValueSrc="21"
            />
            <PickPoint
              pickActive={hr22Active}
              pickClick={hr22Click}
              pickValueSrc="22"
            />
            <PickPoint
              pickActive={hr23Active}
              pickClick={hr23Click}
              pickValueSrc="23"
            />
            <PickPoint
              pickActive={hr24Active}
              pickClick={hr24Click}
              pickValueSrc="24"
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
              pickActive={min0Active}
              pickClick={min0KClick}
              pickValueSrc=":00"
            />
            <PickPoint
              pickActive={min5Active}
              pickClick={min5Click}
              pickValueSrc=":05"
            />
            <PickPoint
              pickActive={min10Active}
              pickClick={min10Click}
              pickValueSrc=":10"
            />
            <PickPoint
              pickActive={min15Active}
              pickClick={min15Click}
              pickValueSrc=":15"
            />
            <PickPoint
              pickActive={min20Active}
              pickClick={min20Click}
              pickValueSrc=":20"
            />
            <PickPoint
              pickActive={min25Active}
              pickClick={min25Click}
              pickValueSrc=":25"
            />
            <PickPoint
              pickActive={min30Active}
              pickClick={min30Click}
              pickValueSrc=":30"
            />
            <PickPoint
              pickActive={min35Active}
              pickClick={min35Click}
              pickValueSrc=":35"
            />
            <PickPoint
              pickActive={min40Active}
              pickClick={min40Click}
              pickValueSrc=":40"
            />
            <PickPoint
              pickActive={min45Active}
              pickClick={min45Click}
              pickValueSrc=":45"
            />
            <PickPoint
              pickActive={min50Active}
              pickClick={min50Click}
              pickValueSrc=":50"
            />
            <PickPoint
              pickActive={min55Active}
              pickClick={min55Click}
              pickValueSrc=":55"
            />
          </_Builtin.Grid>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
