"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuSearch.module.css";

export function MenuSearch({
  as: _Component = _Builtin.Block,
  baseBase = false,
  baseAllOn = true,
  baseListOn = false,
  basePeepOn = false,
  baseProductOn = false,
  basePlaceOn = false,
  baseBrandOn = false,
  baseAllClick = {},
  baseListClick = {},
  basePeepClick = {},
  baseProductClick = {},
  basePlaceClick = {},
  baseBrandClick = {},
  listList = false,
  listAllListOn = true,
  listGiftOn = false,
  listTodoOn = false,
  listSuppliesOn = false,
  listInfoOn = false,
  listEventOn = false,
  listAllListClick = {},
  listGiftClick = {},
  listTodoClick = {},
  listSuppliesClick = {},
  listInfoClick = {},
  listEventClick = {},
  peepPeep = false,
  peepAllPeepOn = true,
  peepFamilyOn = false,
  peepConnectOn = false,
  peepCommunityOn = false,
  peepAllPeepClick = {},
  peepFamilyClick = {},
  peepConnectClick = {},
  peepCommunityClick = {},
  prodProd = false,
  prodAllProdOn = true,
  prodMarketOn = false,
  prodOfferOn = false,
  prodTieOn = false,
  prodLibOn = false,
  prodCommOn = false,
  prodAllProdClick = {},
  prodMarketClick = {},
  prodOfferClick = {},
  prodTieClick = {},
  prodLibClick = {},
  prodCommClick = {},
  placePlace = false,
  placeAllPlaceOn = true,
  placeShoppingOn = false,
  placeFoodOn = false,
  placeServicesOn = false,
  placeEntertainOn = false,
  placeTravelOn = false,
  placeAllPlaceClick = {},
  placeShoppingClick = {},
  placeFoodClick = {},
  placeServicesClick = {},
  placeEntertainClick = {},
  placeTravelClick = {},
  menu = true,
  mini,
  popId,
  anchorId,
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
      {baseBase ? (
        <_Builtin.Block className={_utils.cx(_styles, "menu_wrap")} tag="nav">
          <MenuItem
            tSelected={baseAllOn}
            menuItmClick={baseAllClick}
            lIcn={true}
            pTitleSrc="All"
            lIcnSrc="search"
            tValueSrc=""
          />
          <MenuItem
            tSelected={baseListOn}
            menuItmClick={baseListClick}
            lIcn={true}
            lIcnSrc="list"
            pTitleSrc="Lists"
            tValueSrc="list"
          />
          <MenuItem
            tSelected={basePeepOn}
            menuItmClick={basePeepClick}
            lIcn={true}
            lIcnSrc="peep"
            pTitleSrc="People"
            tValueSrc="peep"
          />
          <MenuItem
            tSelected={baseProductOn}
            menuItmClick={baseProductClick}
            lIcn={true}
            lIcnSrc="product"
            pTitleSrc="Products"
            tValueSrc="poduct"
          />
          <MenuItem
            tSelected={basePlaceOn}
            menuItmClick={basePlaceClick}
            lIcn={true}
            lIcnSrc="place"
            pTitleSrc="Places"
            tValueSrc="place"
          />
          <MenuItem
            tSelected={baseBrandOn}
            menuItmClick={baseBrandClick}
            lIcn={true}
            lIcnSrc="brand"
            pTitleSrc="Brands"
            tValueSrc="brand"
            menuItm={false}
          />
        </_Builtin.Block>
      ) : null}
      {listList ? (
        <_Builtin.Block className={_utils.cx(_styles, "menu_wrap")} tag="nav">
          <MenuItem
            menuItmClick={listAllListClick}
            tSelected={listAllListOn}
            lIcn={true}
            lIcnSrc="list"
            pTitleSrc="All Lists"
            tValueSrc="report"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={listGiftClick}
            tSelected={listGiftOn}
            lIcn={true}
            lIcnSrc="gift"
            pTitleSrc="Gift"
            tValueSrc="feedback"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={listTodoClick}
            tSelected={listTodoOn}
            lIcn={true}
            lIcnSrc="todo"
            pTitleSrc="To Do"
            tValueSrc="delete"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={listSuppliesClick}
            tSelected={listSuppliesOn}
            lIcn={true}
            pTitleSrc="Supplies"
            lIcnSrc="supplies"
            tValueSrc="no-interest"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={listInfoClick}
            tSelected={listInfoOn}
            lIcn={true}
            lIcnSrc="info"
            pTitleSrc="Info"
            tValueSrc="block"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={listEventClick}
            tSelected={listEventOn}
            lIcn={true}
            lIcnSrc="event"
            pTitleSrc="Event"
            tValueSrc="mute"
            menuItm={false}
          />
        </_Builtin.Block>
      ) : null}
      {peepPeep ? (
        <_Builtin.Block className={_utils.cx(_styles, "menu_wrap")} tag="nav">
          <MenuItem
            menuItmClick={peepAllPeepClick}
            tSelected={peepAllPeepOn}
            lIcn={true}
            lIcnSrc="peep"
            pTitleSrc="All People"
            tValueSrc="report"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={peepFamilyClick}
            tSelected={peepFamilyOn}
            lIcn={true}
            lIcnSrc="family"
            pTitleSrc="Family"
            tValueSrc="feedback"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={peepConnectClick}
            tSelected={peepConnectOn}
            lIcn={true}
            lIcnSrc="connect"
            pTitleSrc="Connections"
            tValueSrc="delete"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={peepCommunityClick}
            tSelected={peepCommunityOn}
            lIcn={true}
            pTitleSrc="Community"
            lIcnSrc="public"
            tValueSrc="no-interest"
            menuItm={true}
          />
        </_Builtin.Block>
      ) : null}
      {prodProd ? (
        <_Builtin.Block className={_utils.cx(_styles, "menu_wrap")} tag="nav">
          <MenuItem
            menuItmClick={prodAllProdClick}
            tSelected={prodAllProdOn}
            lIcn={true}
            lIcnSrc="product"
            pTitleSrc="All Products"
            tValueSrc="report"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={prodMarketClick}
            tSelected={prodMarketOn}
            lIcn={true}
            lIcnSrc="store"
            pTitleSrc="Market"
            tValueSrc="feedback"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={prodOfferClick}
            tSelected={prodOfferOn}
            lIcn={true}
            lIcnSrc="offer"
            pTitleSrc="Offers"
            tValueSrc="delete"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={prodTieClick}
            tSelected={prodTieOn}
            lIcn={true}
            pTitleSrc="Ties"
            lIcnSrc="ties"
            tValueSrc="no-interest"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={prodLibClick}
            tSelected={prodLibOn}
            lIcn={true}
            pTitleSrc="Library"
            lIcnSrc="library"
            tValueSrc="no-interest"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={prodCommClick}
            tSelected={prodCommOn}
            lIcn={true}
            pTitleSrc="Community"
            lIcnSrc="comm"
            tValueSrc="no-interest"
            menuItm={true}
          />
        </_Builtin.Block>
      ) : null}
      {placePlace ? (
        <_Builtin.Block className={_utils.cx(_styles, "menu_wrap")} tag="nav">
          <MenuItem
            menuItmClick={placeAllPlaceClick}
            tSelected={placeAllPlaceOn}
            lIcn={true}
            lIcnSrc="place"
            pTitleSrc="All Places"
            tValueSrc="report"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={placeShoppingClick}
            tSelected={placeShoppingOn}
            lIcn={true}
            lIcnSrc="shopping"
            pTitleSrc="Shopping"
            tValueSrc="feedback"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={placeFoodClick}
            tSelected={placeFoodOn}
            lIcn={true}
            lIcnSrc="food"
            pTitleSrc="Food"
            tValueSrc="delete"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={placeServicesClick}
            tSelected={placeServicesOn}
            lIcn={true}
            pTitleSrc="Services"
            lIcnSrc="service"
            tValueSrc="no-interest"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={placeEntertainClick}
            tSelected={placeEntertainOn}
            lIcn={true}
            pTitleSrc="Entertainment"
            lIcnSrc="entertain"
            tValueSrc="no-interest"
            menuItm={true}
          />
          <MenuItem
            menuItmClick={placeTravelClick}
            tSelected={placeTravelOn}
            lIcn={true}
            pTitleSrc="Hotels & Travel"
            lIcnSrc="travel"
            tValueSrc="no-interest"
            menuItm={true}
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
