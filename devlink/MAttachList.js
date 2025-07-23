"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { BarSs } from "./BarSs";
import { AcrdSec } from "./AcrdSec";
import { ListItmCtrl } from "./ListItmCtrl";
import { EmptyCollection } from "./EmptyCollection";
import { Bbc } from "./Bbc";
import * as _utils from "./utils";
import _styles from "./MAttachList.module.css";

export function MAttachList({
  as: _Component = _Builtin.Block,
  atch = true,
  feature = true,
  featureMap,
  exampleFeature = true,
  featureImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  featureImgAlt = "__wf_reserved_inherit",
  featureCaptSrc = "ListName",
  featureClick = {},
  empty = false,
  emptyAddClick = {},
  atchList = true,
  listAcrd = true,
  listAcrdTitleClick = {},
  listSecMap,
  listSecExample = true,
  listSecClick = {},
  listSecImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  listSecImgAlt = "__wf_reserved_inherit",
  listSecTitleSrc = "ListName",
  listSecSubtxtSrc = "OwnerName",
  itmAcrd = true,
  itmAcrdTitleClick = {},
  itmSecMap,
  itmSecSubExample = true,
  itmSecClick = {},
  itmSecImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmSecImgAlt = "__wf_reserved_inherit",
  itmSecTitleSrc = "ItemName",
  itmSecSubtxtSrc = "BrandName",
  placeAcrd = true,
  placeAcrdTitleClick = {},
  placeSecMap,
  placeSecExample = true,
  placeSecClick = {},
  placeSecImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  placeSecImgAlt = "__wf_reserved_inherit",
  placeSecTitleSrc = "PlaceName",
  placeSecSubtxtSrc = "address here",
  fileAcrd = true,
  fileAcrdTitleClick = {},
  fileSecMap,
  fileSecExample = true,
  fileSecClick = {},
  fileSecImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  fileSecImgAlt = "__wf_reserved_inherit",
  fileSecTitleSrc = "FileName",
  fileSecSubtxtSrc = "OwnerName",
  hHeadSubtxtSrc = "xx items",
  hHeadAddClick = {},
  hHeadAdd = true,
  bbcBtnBack = true,
  bbcFltrAll = true,
  bbcFltrList = true,
  bbcFltrProd = true,
  bbcFltrPlace = true,
  bbcFltrFile = true,
  bbcBtnDo = false,
  bbcFltrAllActv = "true",
  bbcFltrListActv,
  bbcFltrProdActv,
  bbcFltrPlaceActv,
  bbcFltrFileActv,
  bbcBtnBackClick = {},
  bbcFltrAllClick = {},
  bbcFltrListClick = {},
  bbcFltrProdClick = {},
  bbcFltrPlaceClick = {},
  bbcFltrFileClick = {},
  bbcBtnDoClick = {},
}) {
  return atch ? (
    <_Component className={_utils.cx(_styles, "attach_list")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={hHeadAddClick}
          subtxtSrc={hHeadSubtxtSrc}
          act1={hHeadAdd}
          titleSrc="Attachments"
          titleSz="h4"
          act1TxtSrc="Add"
          act1IcnSrc="Add"
          act1Txt={false}
          act1Icn={true}
          subtxt={true}
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-header-body")} tag="div">
        <Spacer szDep="16" size="64" />
        {feature ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "featured-itms")}
            tag="div"
          >
            <Spacer szDep="8" size="8" />
            <_Builtin.Section
              className={_utils.cx(_styles, "announce_sec")}
              tag="section"
              grid={{
                type: "section",
              }}
              data-shadow="y"
            >
              <SecHead
                titleSrc="Featured"
                act1TxtSrc="Edit"
                subtxtSrc="How others see you"
                sz=""
                act1Click={{}}
                titleSz="r2"
                act1={false}
              />
              <BarSs barMap={featureMap} slotId="image" />
              <Spacer szDep="8" size="8" />
            </_Builtin.Section>
            <Spacer szDep="16" size="16" />
          </_Builtin.Block>
        ) : null}
        {atchList ? (
          <_Builtin.Block className={_utils.cx(_styles, "list-area")} tag="div">
            <AcrdSec
              secClick={listAcrdTitleClick}
              secSubMap={listSecMap}
              acrdSec={listAcrd}
              secName="Lists"
              exampleSecSub={false}
              secIcn="list"
            />
            <ListItmCtrl
              pPTitleSrc={listSecTitleSrc}
              pPSubtxtSrc={listSecSubtxtSrc}
              listItem={listSecExample}
              primeClick={listSecClick}
              lLImgSrc={listSecImgSrc}
              lLImgAlt={listSecImgAlt}
              lLImg={true}
            />
            <AcrdSec
              secClick={itmAcrdTitleClick}
              secSubMap={itmSecMap}
              acrdSec={itmAcrd}
              secName="Products"
              exampleSecSub={false}
              secIcn="prod"
            />
            <ListItmCtrl
              pPTitleSrc={itmSecTitleSrc}
              pPSubtxtSrc={itmSecSubtxtSrc}
              primeClick={itmSecClick}
              lLImgSrc={itmSecImgSrc}
              lLImgAlt={itmSecImgAlt}
              listItem={itmSecSubExample}
              lLImg={true}
            />
            <AcrdSec
              acrdSec={placeAcrd}
              secClick={placeAcrdTitleClick}
              secSubMap={placeSecMap}
              secName="Places"
              exampleSecSub={false}
              secIcn="place"
            />
            <ListItmCtrl
              listItem={placeSecExample}
              primeClick={placeSecClick}
              pPTitleSrc={placeSecTitleSrc}
              pPSubtxtSrc={placeSecSubtxtSrc}
              lLImgSrc={placeSecImgSrc}
              lLImgAlt={placeSecImgAlt}
              lLImg={true}
            />
            <AcrdSec
              acrdSec={fileAcrd}
              secClick={fileAcrdTitleClick}
              secSubMap={fileSecMap}
              secName="Files"
              exampleSecSub={false}
              secIcn="file"
            />
            <ListItmCtrl
              pPTitleSrc={fileSecTitleSrc}
              pPSubtxtSrc={fileSecSubtxtSrc}
              listItem={fileSecExample}
              primeClick={fileSecClick}
              lLImgSrc={fileSecImgSrc}
              lLImgAlt={fileSecImgAlt}
              lLImg={true}
            />
          </_Builtin.Block>
        ) : null}
        <EmptyCollection
          empty={empty}
          primeBtnClick={emptyAddClick}
          subtxtSrc="Share lists, products, places, and files and add them as attachment to this group or room."
          headlineSrc="Share An Attachment"
          btmDoc={true}
          icnSrc="attach"
          primeBtnTxtSrc="Add Attachment"
        />
      </_Builtin.Block>
      <Bbc />
    </_Component>
  ) : null;
}
