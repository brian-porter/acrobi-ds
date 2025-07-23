"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickHead } from "./PickHead";
import { PickPoint } from "./PickPoint";
import * as _utils from "./utils";
import _styles from "./PickRepeat.module.css";

export function PickRepeat({
  as: _Component = _Builtin.Block,
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
}) {
  return (
    <_Component className={_utils.cx(_styles, "pickdur")} tag="div">
      <PickHead
        leadLbl={qty}
        trailLbl={type}
        prevClick={prevClick}
        prev={true}
        next={false}
      />
      <_Builtin.Block className={_utils.cx(_styles, "pick-5-2col")} tag="div">
        <_Builtin.Grid
          className={_utils.cx(_styles, "pickgrid-5col")}
          tag="div"
        >
          <PickPoint
            pickActive={_1Active}
            pickClick={_1Click}
            pickValueSrc="1"
          />
          <PickPoint
            pickClick={_2Click}
            pickActive={_2Active}
            pickValueSrc="2"
          />
          <PickPoint
            pickActive={_3Active}
            pickClick={_3Click}
            pickValueSrc="3"
          />
          <PickPoint
            pickClick={_4Click}
            pickActive={_4Active}
            pickValueSrc="4"
          />
          <PickPoint
            pickActive={_5Active}
            pickClick={_5Click}
            pickValueSrc="5"
          />
          <PickPoint
            pickClick={_6Click}
            pickActive={_6Active}
            pickValueSrc="6"
          />
          <PickPoint
            pickActive={_7Active}
            pickClick={_7Click}
            pickValueSrc="7"
          />
          <PickPoint
            pickClick={_8Click}
            pickActive={_8Active}
            pickValueSrc="8"
          />
          <PickPoint
            pickActive={_9Active}
            pickClick={_9Click}
            pickValueSrc="9"
          />
          <PickPoint
            pickClick={_10Click}
            pickActive={_10Active}
            pickValueSrc="10"
          />
          <PickPoint
            pickClick={_11Click}
            pickActive={_11Active}
            pickValueSrc="11"
          />
          <PickPoint
            pickClick={_12Click}
            pickActive={_12Active}
            pickValueSrc="12"
          />
          <PickPoint
            pickClick={_13Click}
            pickActive={_13Active}
            pickValueSrc="13"
          />
          <PickPoint
            pickClick={_14Click}
            pickActive={_14Active}
            pickValueSrc="14"
          />
          <PickPoint
            pickClick={_15Click}
            pickActive={_15Active}
            pickValueSrc="15"
          />
          <PickPoint
            pickClick={_16Click}
            pickActive={_16Active}
            pickValueSrc="16"
          />
          <PickPoint
            pickClick={_17Click}
            pickActive={_17Active}
            pickValueSrc="17"
          />
          <PickPoint
            pickClick={_18Click}
            pickActive={_18Active}
            pickValueSrc="18"
          />
          <PickPoint
            pickClick={_19Click}
            pickActive={_19Active}
            pickValueSrc="19"
          />
          <PickPoint
            pickClick={_20Click}
            pickActive={_20Active}
            pickValueSrc="20"
          />
          <PickPoint
            pickClick={_21Click}
            pickActive={_21Active}
            pickValueSrc="21"
          />
          <PickPoint
            pickClick={_22Click}
            pickActive={_22Active}
            pickValueSrc="22"
          />
          <PickPoint
            pickClick={_23Click}
            pickActive={_23Active}
            pickValueSrc="23"
          />
          <PickPoint
            pickClick={_24Click}
            pickActive={_24Active}
            pickValueSrc="24"
          />
          <PickPoint
            pickClick={_25Click}
            pickActive={_25Active}
            pickValueSrc="25"
          />
          <PickPoint
            pickClick={_26Click}
            pickActive={_26Active}
            pickValueSrc="26"
          />
          <PickPoint
            pickClick={_27Click}
            pickActive={_27Active}
            pickValueSrc="27"
          />
          <PickPoint
            pickClick={_28Click}
            pickActive={_28Active}
            pickValueSrc="28"
          />
          <PickPoint
            pickClick={_29Click}
            pickActive={_29Active}
            pickValueSrc="29"
          />
          <PickPoint
            pickClick={_30Click}
            pickActive={_30Active}
            pickValueSrc="30"
          />
        </_Builtin.Grid>
        <_Builtin.Block
          className={_utils.cx(_styles, "pick-1col-wide")}
          id={_utils.cx(
            _styles,
            "w-node-c4577877-b440-a308-4580-13d00810519d-0810517b"
          )}
          tag="div"
        >
          <PickPoint
            pickClick={dayClick}
            pickActive={dayActive}
            pickValueSrc="Day"
          />
          <PickPoint
            pickClick={weekClick}
            pickActive={weekActive}
            pickValueSrc="Week"
          />
          <PickPoint
            pickClick={monthClick}
            pickActive={monthActive}
            pickValueSrc="Month"
          />
          <PickPoint
            pickClick={yearClick}
            pickActive={yearActive}
            pickValueSrc="Year"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
