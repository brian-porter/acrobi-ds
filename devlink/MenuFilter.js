"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuFilter.module.css";

export function MenuFilter({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  trending = false,
  trendingOn = false,
  trendingClick = {},
  scan = false,
  scanOn = false,
  scanClick = {},
  inteli = false,
  inteliOn = false,
  inteliClick = {},
  buy = false,
  buyOn = false,
  buyClick = {},
}) {
  return menu ? (
    <_Component
      className={_utils.cx(_styles, "menu_wrap")}
      tag="nav"
      data-mini={mini}
      popover=""
      anchor={anchorId}
      data-bs="xs"
      id={popId}
    >
      <MenuItem
        menuItm={trending}
        menuItmClick={trendingClick}
        tSelected={trendingOn}
        lIcn={true}
        lIcnSrc="hot"
        pTitleSrc="Trending"
        tValueSrc="report"
      />
      <MenuItem
        menuItm={scan}
        menuItmClick={scanClick}
        tSelected={scanOn}
        lIcn={true}
        lIcnSrc="history"
        pTitleSrc="Past Scans"
        tValueSrc="feedback"
      />
      <MenuItem
        menuItm={inteli}
        menuItmClick={inteliClick}
        tSelected={inteliOn}
        lIcn={true}
        lIcnSrc="inteli"
        pTitleSrc="InteliSelect"
        tValueSrc="delete"
      />
      <MenuItem
        menuItm={buy}
        menuItmClick={buyClick}
        tSelected={buyOn}
        lIcn={true}
        pTitleSrc="Purchases"
        lIcnSrc="shopping"
        tValueSrc="no-interest"
      />
    </_Component>
  ) : null;
}
