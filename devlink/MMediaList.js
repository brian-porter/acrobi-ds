"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { ImgSs } from "./ImgSs";
import { Img } from "./Img";
import * as _utils from "./utils";
import _styles from "./MMediaList.module.css";

export function MMediaList({
  as: _Component = _Builtin.Block,
  mediaList = true,
  head = true,
  feature = true,
  bbc = true,
  hHeadTitleIcn = false,
  hHeadTitleSrc = "Gallery",
  hHeadSubtxtSrc = "23 items",
  hHeadSelect = false,
  hHeadAdd = false,
  hHeadTitleClick = {},
  hHeadSelectClick = {},
  hHeadAddClick = {},
  featurePlayClick = {},
  featureImgMap,
  exampleFeatureImg = true,
  imgMap,
  exampleImg = true,
  exFeatureImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exFeatureImgAlt = "__wf_reserved_inherit",
  exFeatureImgClick = {},
  exImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exImgAlt = "__wf_reserved_inherit",
  exImgSelect = true,
  exImgSelectSrc = "circ_off",
  exImgClick = {},
  bbcNavMap,
  bbcExampleBbc = true,
  bbcBtnBack = true,
  bbcFltrAll = true,
  bbcFltrImg = true,
  bbcFltrVid = true,
  bbcFltrScan = false,
  bbcFltrBkmrk = false,
  bbcBtnDo = false,
  bbcFltrAllActv = "true",
  bbcFltrImgActv,
  bbcFltrVidActv,
  bbcFltrScanActv,
  bbcFltrBkmrkActv,
  bbcBtnBackClick = {},
  bbcFltrAllClick = {},
  bbcFltrImgClick = {},
  bbcFltrVidClick = {},
  bbcFltrScanClick = {},
  bbcFltrBkmrkClick = {},
  bbcBtnADoClick = {},
  bgClr,
  slotId = "image-select",
}) {
  return mediaList ? (
    <_Component
      className={_utils.cx(_styles, "media_list")}
      tag="div"
      data-bg-clr={bgClr}
    >
      {head ? (
        <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
          <SecHead
            titleSrc={hHeadTitleSrc}
            act1Click={hHeadAddClick}
            titleIcn={hHeadTitleIcn}
            subtxtSrc={hHeadSubtxtSrc}
            act1={hHeadAdd}
            act2={hHeadSelect}
            act2Click={hHeadSelectClick}
            titleSz="h4"
            titleIcnSrc="nav_down"
            act1TxtSrc="Add"
            titleIcnClr="n500"
            act1Clr="f500"
            subtxt={true}
            act2TxtSrc="Select"
            act2IcnSrc=""
            act1IcnSrc="Add"
            act1Icn={true}
            act1Txt={false}
            act2Icn={false}
            act2Txt={true}
            act2Clr="f500"
            act2Styl="ft"
            titleIcnSz="s"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "a-header-body")} tag="div">
        <Spacer szDep="8" size="8" />
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
                act1Click={featurePlayClick}
                titleSrc="Playlist"
                act1TxtSrc="Play"
                subtxtSrc="How others see you"
                titleSz="r2"
                act1={true}
                act1IcnLoc="r"
                act1Icn={true}
                act1IcnSrc="play"
                titleIcnClr="n500"
              />
              <ImgSs
                cellMap={featureImgMap}
                cellExample={exampleFeatureImg}
                vizImgSrc={exFeatureImgSrc}
                vizImgAlt={exFeatureImgAlt}
                cellCellClick={exFeatureImgClick}
                sideFade={false}
              />
              <Spacer szDep="8" size="8" />
            </_Builtin.Section>
            <Spacer szDep="16" size="16" />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Grid
          className={_utils.cx(_styles, "media_grid")}
          tag="div"
          id={slotId}
        >
          {imgMap ??
            (exampleImg ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "example-image")}
                id={_utils.cx(
                  _styles,
                  "w-node-d9ed5438-452e-523d-29b4-86ddc41c5775-c41c576c"
                )}
                tag="div"
              >
                <Img
                  icnBarIcnBarR1={exImgSelect}
                  icnBarIcnBarR1Src={exImgSelectSrc}
                  imgSrc={exImgSrc}
                  imgClick={exImgClick}
                  imgAlt={exImgAlt}
                  icnBar={true}
                  imgSz="in"
                  id="image-select"
                />
              </_Builtin.Block>
            ) : null)}
        </_Builtin.Grid>
        <_Builtin.Block
          className={_utils.cx(_styles, "bbc_btm-body-spacer1")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
