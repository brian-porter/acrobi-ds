"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuSortStyle.module.css";

export function MenuSortStyle({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  relevance = false,
  relevanceOn = false,
  popularity = false,
  popularityOn = false,
  rank = false,
  rankOn = false,
  history = false,
  historyOn = false,
  priceH2L = false,
  priceH2LOn = false,
  priceL2H = false,
  priceL2HOn = false,
  alpha = false,
  alphaOn = false,
  number = false,
  numberOn = false,
  custom = false,
  customOn = false,
  relevanceClick = {},
  popularityClick = {},
  rankClick = {},
  historyClick = {},
  priceH2LClick = {},
  priceL2HClick = {},
  alphaClick = {},
  numberClick = {},
  customClick = {},
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
      <SecHead titleSrc="Sort by" sz="xl" act1={false} titleSz="h4" />
      <MenuItem
        menuItm={relevance}
        tSelected={relevanceOn}
        menuItmClick={relevanceClick}
        lIcnSrc="relevance"
        pTitleSrc="Relevance"
        tValueSrc="relevance"
        lIcn={true}
      />
      <MenuItem
        menuItm={popularity}
        tSelected={popularityOn}
        menuItmClick={popularityClick}
        lIcn={true}
        lIcnSrc="hot"
        pTitleSrc="Popularity"
        tValueSrc="popularity"
      />
      <MenuItem
        menuItm={rank}
        tSelected={rankOn}
        menuItmClick={rankClick}
        lIcn={true}
        pTitleSrc="Average Rank"
        tValueSrc="rank"
        lIcnSrc="star_plus"
      />
      <MenuItem
        menuItm={history}
        tSelected={historyOn}
        menuItmClick={historyClick}
        lIcn={true}
        pTitleSrc="Activity"
        lIcnSrc="history"
        tValueSrc="history"
      />
      <MenuItem
        menuItm={priceH2L}
        tSelected={priceH2LOn}
        menuItmClick={priceH2LClick}
        lIcn={true}
        lIcnSrc="price_low"
        pTitleSrc="Price - High to Low"
        tValueSrc="priceh2l"
      />
      <MenuItem
        menuItm={priceL2H}
        tSelected={priceL2HOn}
        menuItmClick={priceL2HClick}
        lIcn={true}
        lIcnSrc="price_high"
        pTitleSrc="Price - Low to High"
        tValueSrc="pricel2h"
      />
      <MenuItem
        menuItm={alpha}
        tSelected={alphaOn}
        menuItmClick={alphaClick}
        lIcn={true}
        pTitleSrc="Name"
        tValueSrc="alpha"
        lIcnSrc="order_alpha"
      />
      <MenuItem
        menuItm={number}
        tSelected={numberOn}
        menuItmClick={numberClick}
        lIcn={true}
        lIcnSrc="order_number"
        pTitleSrc="Number"
        tValueSrc="number"
      />
      <MenuItem
        menuItm={custom}
        tSelected={customOn}
        menuItmClick={customClick}
        lIcn={true}
        lIcnSrc="reorder"
        pTitleSrc="Custom"
        tValueSrc="custom"
      />
    </_Component>
  ) : null;
}
