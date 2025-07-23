"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MediaHero } from "./MediaHero";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { MediaItem } from "./MediaItem";
import { SecHead } from "./SecHead";
import { SecPeep } from "./SecPeep";
import * as _utils from "./utils";
import _styles from "./PItemGroup.module.css";

export function PItemGroup({
  as: _Component = _Builtin.Block,
  heroGttrPin = false,
  heroGttrBkmrk = false,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif",
  heroImgAlt = "__wf_reserved_inherit",
  heroTitle = "GroupName here with truncation at one line",
  heroAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  heroAvtrAlt = "__wf_reserved_inherit",
  heroAvtr2 = false,
  heroAvtr3 = false,
  heroAvtr4 = false,
  heroAvtr5 = false,
  heroAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  heroAvtr2Alt = "__wf_reserved_inherit",
  heroAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  heroAvtr3Alt = "__wf_reserved_inherit",
  heroAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  heroAvtr4Alt = "__wf_reserved_inherit",
  heroAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  heroAvtr5Alt = "__wf_reserved_inherit",
  heroMbr = "156",
  heroTime = "2d",
  heroClick = {},
  heroMoreClick = {},
  groupAddClick = {},
  scanBtn = false,
  scanBtnClick = {},
  searchClick = {},
  searchChange,
  fltrBtn = false,
  fltrClick = {},
  postMap,
  postExample = true,
  pop = true,
  popMap,
  popExample = true,
  peep = true,
  peepMap,
  peepExample = true,
  peepStat1Src = "3 connections",
  peepStat2Src = "24 community",
  slotIdGrid = "media-item",
  slotIdPop = "media-item",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-60-40", "cc-top")}
          id={_utils.cx(
            _styles,
            "w-node-ba235d64-eab6-91fb-be7d-ef651e43794f-ea438450"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-ba235d64-eab6-91fb-be7d-ef651e437950-ea438450"
            )}
          >
            <MediaHero
              titleSrc={heroTitle}
              atrbBdg1TxtSrc={heroMbr}
              atrbAvtrSrc={heroAvtr}
              atrbAvtrAlt={heroAvtrAlt}
              atrbTimeSrc={heroTime}
              actClick={heroMoreClick}
              atrbAvtr2={heroAvtr2}
              gttrPin={heroGttrPin}
              gttrBkmrk={heroGttrBkmrk}
              vizImgSrc={heroImgSrc}
              vizImgAlt={heroImgAlt}
              vizClick={heroClick}
              atrbAvtr3={heroAvtr3}
              atrbAvtr4={heroAvtr4}
              atrbAvtr5={heroAvtr5}
              atrbAvtr2Src={heroAvtr2Src}
              atrbAvtr2Alt={heroAvtr2Alt}
              atrbAvtr3Src={heroAvtr3Src}
              atrbAvtr3Alt={heroAvtr3Alt}
              atrbAvtr4Src={heroAvtr4Src}
              atrbAvtr4Alt={heroAvtr4Alt}
              atrbAvtr5Src={heroAvtr5Src}
              atrbAvtr5Alt={heroAvtr5Alt}
              atrbNameSrc="AdminName"
              captClick={{}}
              titleSz="r2"
              atrb={true}
              atrbBdg1IcnSrc="member"
              atrbName={false}
            />
            <Spacer szDep="32" size="32" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_4250afb0-783b-5e42-0c16-8957c906b62e-ea438450"
            )}
          >
            <ItmSecCta
              btnClick={groupAddClick}
              desc="Get together with others interested in the subject, help others with their questions, and share your experiences."
              header="Groups"
              eyebrowSrc="join the conversation"
              btnIcnSrc="Group"
              btnTxtSrc="Start"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-a66418c8-80cf-725b-af27-2113295f2ee5-ea438450"
            )}
          >
            <InputWBtns
              lLBtn={scanBtn}
              tTBtn={fltrBtn}
              lLBtnClick={scanBtnClick}
              fldFldClick={searchClick}
              fldFldOnChange={searchChange}
              tTBtnClick={fltrClick}
              tTBtnIcnSrc="act_filter"
              fldFldTBtn={false}
              tTBtnPad="n"
            />
            <Spacer size="16" />
            <_Builtin.Grid
              className={_utils.cx(_styles, "obj-grid")}
              tag="div"
              id={slotIdGrid}
            >
              {postMap ?? (
                <MediaItem
                  mediaItem={postExample}
                  atrbAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                  atrbAvtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                  atrbAvtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                  atrbAvtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                  atrbAvtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                  atrbName={false}
                  subtxt={false}
                  id="media-item"
                />
              )}
            </_Builtin.Grid>
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_931413a1-5d5e-86cb-bf0b-c4513f1d7ea3-ea438450"
            )}
          >
            {pop ? (
              <_Builtin.Section
                className={_utils.cx(_styles, "pop-sec")}
                grid={{
                  type: "section",
                }}
                tag="section"
              >
                <SecHead
                  titleSrc="Popular"
                  titleIcn={true}
                  titleIcnSrc="hot"
                  act1={false}
                />
                <Spacer size="16" />
                <_Builtin.Grid
                  className={_utils.cx(_styles, "media-grid-aside")}
                  tag="div"
                  id={slotIdPop}
                >
                  {popMap ?? (
                    <MediaItem
                      mediaItem={popExample}
                      atrbAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                      atrbAvtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                      atrbAvtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                      atrbAvtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                      atrbAvtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                      atrbName={false}
                      subtxt={false}
                    />
                  )}
                </_Builtin.Grid>
              </_Builtin.Section>
            ) : null}
            <SecPeep
              sec={peep}
              conCellMap={peepMap}
              conExampleCell={peepExample}
              stat1Src={peepStat1Src}
              stat2Src={peepStat2Src}
              exampleBtn={false}
              exampleCaptSubtxt={false}
              exampleTitleSrc="FName"
              secHeadAct1Click={{}}
              secHeadAct1TxtSrc="See All"
              exampleVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
              secHeadTitleSrc="Leaders"
              secHeadTitleIcnSrc="businessman"
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
