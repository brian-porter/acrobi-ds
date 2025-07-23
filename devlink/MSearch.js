"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { CtaIcon } from "./CtaIcon";
import { Paragraph } from "./Paragraph";
import { ListItmContent } from "./ListItmContent";
import { List } from "./List";
import { Chip } from "./Chip";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MSearch.module.css";

export function MSearch({
  as: _Component = _Builtin.Block,
  titleSrc = "Recent",
  cancelClick = {},
  recent = true,
  recentNull = false,
  exampleRecentList = false,
  exampleHistory30 = false,
  exampleHistoryold = false,
  recentMap,
  result = false,
  resultNull = false,
  exampleResultList = false,
  resultMap,
  history = false,
  clear30Click = {},
  history30Map,
  clearOldClick = {},
  historyOldMap,
  allClick = {},
  allActive = "true",
  listIcnSrc = "list",
  listActive = "false",
  listClick = {},
  peepIcnSrc = "peep",
  peepActive = "false",
  peepClick = {},
  prodIcnSrc = "product",
  prodActive = "false",
  prodClick = {},
  placeIcnSrc = "place",
  placeActive = "false",
  placeClick = {},
  scanBtnClick = {},
  searchPholdSrc = "Search",
  searchClick = {},
  searchOnChange,
  searchClear = false,
  searchClearClick = {},
  searchBtnClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-search-wrap")}
      tag="div"
      id="Search-Recent"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc={titleSrc}
          sz="xl"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        {recentNull ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "search-recentnull")}
            tag="div"
          >
            <CtaIcon
              heroIconName="search"
              heroHeadlineCopy="Let's Search"
              heroDescriptionCopy="Find what you're looking for across the categories below. Then your recent requests will show here."
            />
            <Paragraph
              align="c"
              bodySrc="Pro Tip: Narrow your search using chips."
            />
          </_Builtin.Block>
        ) : null}
        {exampleRecentList ? (
          <_Builtin.List
            className={_utils.cx(_styles, "ex-recent")}
            tag="ul"
            id="recent"
            unstyled={true}
          >
            <ListItmContent
              lIcnL={true}
              lImg={false}
              lAvtr={false}
              lAdptIcn={false}
              lIcnSrc="search"
              pTitleSrc="UnknownObjectName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={false}
              pSubtxt2={false}
              pSubtxt1Src="Subtext1"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
            />
            <ListItmContent
              lIcnL={true}
              lImg={false}
              lAvtr={false}
              lAdptIcn={false}
              lIcnSrc="list"
              pTitleSrc="ListName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={false}
              pSubtxt2={false}
              pSubtxt1Src="Subtext1"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
            />
            <ListItmContent
              lIcnL={true}
              lImg={false}
              lAvtr={false}
              lAdptIcn={false}
              lIcnSrc="peep"
              pTitleSrc="PersonName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={false}
              pSubtxt2={false}
              pSubtxt1Src="Subtext1"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
            />
            <ListItmContent
              lIcnL={true}
              lImg={false}
              lAvtr={false}
              lAdptIcn={false}
              lIcnSrc="product"
              pTitleSrc="ProductName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={false}
              pSubtxt2={false}
              pSubtxt1Src="Subtext1"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
            />
            <ListItmContent
              lIcnL={true}
              lImg={false}
              lAvtr={false}
              lAdptIcn={false}
              lIcnSrc="brand"
              pTitleSrc="BrandName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={false}
              pSubtxt2={false}
              pSubtxt1Src="Subtext1"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
            />
            <ListItmContent
              lIcnL={true}
              lImg={false}
              lAvtr={false}
              lAdptIcn={false}
              lIcnSrc="place"
              pTitleSrc="PlaceName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={false}
              pSubtxt2={false}
              pSubtxt1Src="Subtext1"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
            />
            <ListItmContent
              lIcnL={true}
              lImg={false}
              lAvtr={false}
              lAdptIcn={false}
              lIcnSrc="history"
              pTitleSrc="More History"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lIcnClr="p500"
              lIcnSz="s"
              lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
              lImgAlt="__wf_reserved_inherit"
              lImgSz="l"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={false}
              pSubtxt2={false}
              pSubtxt1Src="Subtext1"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
            />
          </_Builtin.List>
        ) : null}
        <List listItmMap={recentMap} list={recent} exampleListItm={false} />
        {exampleResultList ? (
          <_Builtin.List
            className={_utils.cx(_styles, "ex-results")}
            tag="ul"
            id="result"
            unstyled={true}
          >
            <ListItmContent
              pTitleSrc="ObjectName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lImgSz="m"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={true}
              pSubtxt2={false}
              pSubtxt1Src="OwneName"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
              lImg={true}
            />
            <ListItmContent
              pTitleSrc="ObjectName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lImgSz="m"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={true}
              pSubtxt2={false}
              pSubtxt1Src="OwneName"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
              lAdptIcn={true}
            />
            <ListItmContent
              pTitleSrc="FName LName"
              tBtn={false}
              tSuprAct={false}
              tTRdio={false}
              tTogl={false}
              listItm={true}
              lImgSz="m"
              lAvtrSz="m"
              lAdptIcnSrc="Default"
              lAdptSz="m"
              lAdptBgClr="n500"
              lLDiv=""
              pTitleSubtxt={true}
              pTitleSz="r2"
              pTitleClr="n900"
              pSubtxt1={true}
              pSubtxt2={false}
              pSubtxt1Src="@handle"
              pSubtxt2Src="Subtext2"
              pSubtxt1Sz="r3"
              pSubtxt2Sz="r3"
              pSubtxt1Clr="n700"
              pSubtxt2Clr="n700"
              pPDiv="y"
              tActLbl1Txt={false}
              lAvtr={true}
            />
          </_Builtin.List>
        ) : null}
        <List listItmMap={resultMap} list={result} exampleListItm={false} />
        {history ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "search-history")}
            tag="div"
          >
            <SecHead
              act1Click={clear30Click}
              titleSrc="Last 30 days"
              sz="t"
              act1={true}
              act1TxtSrc="Clear"
              titleClr="n500"
              titleSz="r3"
            />
            {exampleHistory30 ? (
              <_Builtin.List
                className={_utils.cx(_styles, "ex-history30")}
                tag="ul"
                id="history30"
                unstyled={true}
              >
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="search"
                  pTitleSrc="SearchTermFilteredNone"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="list"
                  pTitleSrc="SearchTermFilteredbyList"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="peep"
                  pTitleSrc="SearchTermFilteredbyPeep"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="product"
                  pTitleSrc="SearchTermFilteredbyProduct"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
              </_Builtin.List>
            ) : null}
            <List
              listItmMap={history30Map}
              list={history}
              exampleListItm={false}
            />
            <SecHead
              act1Click={clearOldClick}
              titleSrc="Older"
              sz="t"
              act1={true}
              act1TxtSrc="Clear"
              titleClr="n500"
              titleSz="r3"
            />
            {exampleHistoryold ? (
              <_Builtin.List
                className={_utils.cx(_styles, "ex-historyold")}
                tag="ul"
                id="historyold"
                unstyled={true}
              >
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="assets"
                  pTitleSrc="SearchTermFilteredbyAssets"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="supplies"
                  pTitleSrc="SearchTermFilteredbySupplies"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="place"
                  pTitleSrc="SearchTermFilteredbyPlace"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
                <ListItmContent
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="history"
                  pTitleSrc="More History"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSubtxt={true}
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt1={false}
                  pSubtxt2={false}
                  pSubtxt1Src="Subtext1"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                />
              </_Builtin.List>
            ) : null}
            <List
              listItmMap={historyOldMap}
              list={history}
              exampleListItm={false}
            />
          </_Builtin.Block>
        ) : null}
        {resultNull ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "search-resultnull")}
            tag="div"
          >
            <CtaIcon
              heroIconName="detective"
              heroHeadlineCopy="No Results Found"
              heroDescriptionCopy="Sorry we couldn't find a match for that"
            />
          </_Builtin.Block>
        ) : null}
        <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%2F*%20width%20*%2F%0A.a-body%3A%3A-webkit-scrollbar%20%7B%0A%20%20width%3A%202px%3B%0A%7D%0A%0A%2F*%20Track%20*%2F%0A.a-body%3A%3A-webkit-scrollbar-track%20%7B%0A%20%20background%3A%20var(--color--n100)%3B%0A%7D%0A%0A%2F*%20Handle%20*%2F%0A.a-body%3A%3A-webkit-scrollbar-thumb%20%7B%0A%20%20background%3A%20var(--color--p500)%3B%0A%7D%0A%0A%2F*%20Handle%20on%20hover%20*%2F%0A.a-body%3A%3A-webkit-scrollbar-thumb%3Ahover%20%7B%0A%20%20background%3A%20var(--color--p700)%3B%0A%7D%0A%3C%2Fstyle%3E" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        data-bs="s"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "bar-sidescroll")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "u-bargap-ss")}
            tag="div"
          >
            <Chip
              chipClick={allClick}
              chipActive={allActive}
              chipIcn={false}
              chipTxtSrc="All"
            />
            <Chip
              chipIcnSrc={listIcnSrc}
              chipClick={listClick}
              chipActive={listActive}
              chipTxtSrc="Lists"
            />
            <Chip
              chipIcnSrc={peepIcnSrc}
              chipClick={peepClick}
              chipActive={peepActive}
              chipTxtSrc="People"
            />
            <Chip
              chipIcnSrc={prodIcnSrc}
              chipClick={prodClick}
              chipActive={prodActive}
              chipTxtSrc="Products"
            />
            <Chip
              chipIcnSrc={placeIcnSrc}
              chipClick={placeClick}
              chipActive={placeActive}
              chipTxtSrc="Places"
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade-l")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade-r")}
              tag="div"
            />
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
          </_Builtin.Block>
        </_Builtin.Block>
        <InputWBtns
          lLBtnClick={scanBtnClick}
          fldFldClick={searchClick}
          fldFldOnChange={searchOnChange}
          fldFldPholdSrc={searchPholdSrc}
          fldFldTBtn={searchClear}
          fldFldTBtnClick={searchClearClick}
          tTBtnClick={searchBtnClick}
          fldFldAutoFocus="true"
          tTBtnTxtSrc="Search"
          tTBtnStyle="pf"
          tTBtnIcn={false}
          tTBtnTxt={true}
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
