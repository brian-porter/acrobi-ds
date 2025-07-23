"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Message } from "./Message";
import { MenuItem } from "./MenuItem";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MMute.module.css";

export function MMute({
  as: _Component = _Builtin.Block,
  mute = true,
  _15M = true,
  _15MOn = true,
  _1H = true,
  _1HOn = false,
  _3H = true,
  _3HOn = false,
  _8H = true,
  _8HOn = false,
  _24H = true,
  _24HOn = false,
  _2D = false,
  _2DOn = false,
  _1W = false,
  _1WOn = false,
  _2W = false,
  _2WOn = false,
  _1M = false,
  _1MOn = false,
  _3M = false,
  _3MOn = false,
  _6M = false,
  _6MOn = false,
  allOn = false,
  cancelClick = {},
  _15MClick = {},
  _1HClick = {},
  _3HClick = {},
  _8HClick = {},
  _24HClick = {},
  _2DClick = {},
  _1WClick = {},
  _2WClick = {},
  _1MClick = {},
  _3MClick = {},
  _6MClick = {},
  allClick = {},
  doClick = {},
}) {
  return mute ? (
    <_Component
      className={_utils.cx(_styles, "g-mute")}
      tag="section"
      id="Mute"
    >
      <SecHead
        act1Click={cancelClick}
        titleSrc="Mute for"
        sz="xl"
        titleSz="h4"
      />
      <Message
        bodySrc="You won't receive notifications from muted {objectType}'s, and they will appear with a muted symbol. These settings apply across all your devices."
        titleSrc="Stop communication for a set amount of time"
        icnSrc="Block"
        icnClr="fd500"
      />
      <MenuItem
        menuItmClick={_15MClick}
        tSelected={_15MOn}
        menuItm={_15M}
        pTitleSrc="15 minutes"
      />
      <MenuItem
        menuItmClick={_1HClick}
        tSelected={_1HOn}
        menuItm={_1H}
        pTitleSrc="1 hour"
      />
      <MenuItem
        menuItmClick={_3HClick}
        tSelected={_3HOn}
        menuItm={_3H}
        pTitleSrc="3 hours"
      />
      <MenuItem
        menuItmClick={_8HClick}
        tSelected={_8HOn}
        menuItm={_8H}
        pTitleSrc="8 hours"
      />
      <MenuItem
        menuItmClick={_24HClick}
        tSelected={_24HOn}
        menuItm={_24H}
        pTitleSrc="24 hours"
      />
      <MenuItem
        menuItmClick={_2DClick}
        tSelected={_2DOn}
        menuItm={_2D}
        pTitleSrc="2 days"
      />
      <MenuItem
        menuItmClick={_1WClick}
        tSelected={_1WOn}
        menuItm={_1W}
        pTitleSrc="1 week"
      />
      <MenuItem
        menuItmClick={_2WClick}
        tSelected={_2WOn}
        menuItm={_2W}
        pTitleSrc="2 weeks"
      />
      <MenuItem
        menuItmClick={_1MClick}
        tSelected={_1MOn}
        menuItm={_1M}
        pTitleSrc="1 month"
      />
      <MenuItem
        menuItmClick={_3MClick}
        tSelected={_3MOn}
        menuItm={_3M}
        pTitleSrc="3 months"
      />
      <MenuItem
        menuItmClick={_6MClick}
        tSelected={_6MOn}
        menuItm={_6M}
        pTitleSrc="6 months"
      />
      <MenuItem
        menuItmClick={allClick}
        tSelected={allOn}
        pTitleSrc="Until I turn it back on"
        pItmDiv=""
        tItmDiv=""
      />
      <Spacer szDep="48" size="48" />
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        data-bs=""
      >
        <ButtonPanel
          btn1Click={doClick}
          btn1TxtSrc="Mute"
          btn2={false}
          btn3={false}
          btn1Styl="df"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
