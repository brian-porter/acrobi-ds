"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { Cell } from "./Cell";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecFavs.module.css";

export function SnipSecFavs({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "favs",
  secHeadTitleSrc = "Favorites",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conSideFade = false,
  conFavProd = true,
  conFavPlace = true,
  conFavCreator = true,
  conFavStore = true,
  conFavBrand = true,
  conFavProdQty = "{#}",
  conFavPlaceQty = "{#}",
  conFavCreatorQty = "{#}",
  conFavStoreQty = "{#}",
  conFavBrandQty = "{#}",
  conFavProdClick = {},
  conFavPlaceClick = {},
  conFavCreatorClick = {},
  conFavStoreClick = {},
  conFavBrandClick = {},
  stats = false,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = false,
  stat3 = false,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "fav-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        subtxt={false}
        subtxtSrc=""
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        <Spacer szDep="16" size="16" />
        <_Builtin.Block className={_utils.cx(_styles, "bar-adpticn")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "u-bar-ss")} tag="div">
            <Cell
              capStkRow2Src={conFavProdQty}
              cellClick={conFavProdClick}
              cell={conFavProd}
              vizImg={false}
              vizAdpt={true}
              adptAdptSz="l"
              capStkRow2={true}
              captionCapStk={true}
              capStkRowsAlign="c"
              capStkRow2Clr="n500"
              capStkRow1Src="Products"
              adptAdptBgClr="blue-700"
              adptAdptIcnSrc="Product"
              adptAdptShape="s"
              cellSz="l"
              caption={true}
            />
            <Cell
              capStkRow2Src={conFavPlaceQty}
              cellClick={conFavPlaceClick}
              cell={conFavPlace}
              vizImg={false}
              vizAdpt={true}
              adptAdptSz="l"
              capStkRow2={true}
              captionCapStk={true}
              capStkRowsAlign="c"
              capStkRow2Clr="n500"
              capStkRow1Src="Places"
              adptAdptBgClr="green-700"
              adptAdptIcnSrc="Place"
              adptAdptShape="s"
              cellSz="l"
              caption={true}
            />
            <Cell
              capStkRow2Src={conFavCreatorQty}
              cellClick={conFavCreatorClick}
              cell={conFavCreator}
              vizImg={false}
              vizAdpt={true}
              adptAdptSz="l"
              capStkRow2={true}
              captionCapStk={true}
              capStkRowsAlign="c"
              capStkRow2Clr="n500"
              capStkRow1Src="Creators"
              adptAdptBgClr="purple-700"
              adptAdptIcnSrc="Peep"
              adptAdptShape="s"
              cellSz="l"
              caption={true}
            />
            <Cell
              capStkRow2Src={conFavStoreQty}
              cellClick={conFavStoreClick}
              cell={conFavStore}
              vizImg={false}
              vizAdpt={true}
              adptAdptSz="l"
              capStkRow2={true}
              captionCapStk={true}
              capStkRowsAlign="c"
              capStkRow2Clr="n500"
              capStkRow1Src="Stores"
              adptAdptBgClr="red-500"
              adptAdptIcnSrc="Store"
              adptAdptShape="s"
              cellSz="l"
              caption={true}
            />
            <Cell
              capStkRow2Src={conFavBrandQty}
              cellClick={conFavBrandClick}
              cell={conFavBrand}
              vizImg={false}
              vizAdpt={true}
              adptAdptSz="l"
              capStkRow2={true}
              captionCapStk={true}
              capStkRowsAlign="c"
              capStkRow2Clr="n500"
              capStkRow1Src="Brands"
              adptAdptBgClr="orange-500"
              adptAdptIcnSrc="Brand"
              adptAdptShape="s"
              cellSz="l"
              caption={true}
            />
          </_Builtin.Block>
          {conSideFade ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "side-fade-l")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "side-fade-r")}
                tag="div"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <StatsBar
          stats={stats}
          stat2={stat2}
          stat3={stat3}
          stat4={stat4}
          stat1Src={stat1Src}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stat4Src={stat4Src}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
