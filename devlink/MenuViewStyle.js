"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuViewStyle.module.css";

export function MenuViewStyle({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  stack = false,
  stackOn = false,
  list = false,
  lIstOn = false,
  card = false,
  cardOn = false,
  grid = false,
  gridOn = false,
  masonry = false,
  masonryOn = false,
  carousel = false,
  carouselOn = false,
  stackClick = {},
  listClick = {},
  cardClick = {},
  gridClick = {},
  masonryClick = {},
  carouselClick = {},
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
      <SecHead titleSrc="View Style" sz="xl" act1={false} titleSz="h4" />
      <MenuItem
        menuItm={stack}
        menuItmClick={stackClick}
        tSelected={stackOn}
        lIcn={true}
        lIcnSrc="stack"
        pTitleSrc="Stack"
        tValueSrc="stack"
      />
      <MenuItem
        menuItm={list}
        menuItmClick={listClick}
        tSelected={lIstOn}
        lIcn={true}
        pTitleSrc="List"
        tValueSrc="list"
        lIcnSrc="list_style"
      />
      <MenuItem
        menuItm={card}
        menuItmClick={cardClick}
        tSelected={cardOn}
        lIcn={true}
        lIcnSrc="grid2_style"
        pTitleSrc="Card"
        tValueSrc="card"
      />
      <MenuItem
        menuItm={grid}
        menuItmClick={gridClick}
        tSelected={gridOn}
        lIcn={true}
        lIcnSrc="grid3_style"
        pTitleSrc="Grid"
        tValueSrc="grid"
      />
      <MenuItem
        menuItm={masonry}
        menuItmClick={masonryClick}
        tSelected={masonryOn}
        lIcn={true}
        lIcnSrc="masonry_style"
        pTitleSrc="Masonry"
        tValueSrc="masonry"
      />
      <MenuItem
        menuItm={carousel}
        menuItmClick={carouselClick}
        tSelected={carouselOn}
        lIcn={true}
        lIcnSrc="carousel"
        pTitleSrc="Carousel"
        tValueSrc="carousel"
      />
    </_Component>
  ) : null;
}
