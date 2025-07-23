"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ItemHead } from "./ItemHead";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { Post } from "./Post";
import { VideoItem } from "./VideoItem";
import { MediaItem } from "./MediaItem";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./PItemNote.module.css";

export function PItemNote({
  as: _Component = _Builtin.Block,
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  noteAddClick = {},
  scanBtn = false,
  scanBtnClick = {},
  searchClick = {},
  searchChange,
  fltrBtn = false,
  fltrClick = {},
  note = true,
  noteMap,
  noteExample = true,
  review = true,
  reviewMap,
  reviewExample = true,
  quest = true,
  questMap,
  questExample = true,
  video = true,
  videoMap,
  videoExample = true,
  group = true,
  groupMap,
  groupExample = true,
  groupStat1Src = "3 connections",
  groupStat2Src = "24 community",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-60-40")}
          id={_utils.cx(
            _styles,
            "w-node-dfdfff0e-b922-ee78-3407-b87edecb01a0-8098857f"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-dfdfff0e-b922-ee78-3407-b87edecb01a1-8098857f"
            )}
          >
            <ItemHead
              itmHead={itmHead}
              itmImgSrc={itmImgSrc}
              itmImgAlt={itmImgAlt}
              name={itmName}
            />
            <Spacer szDep="32" size="32" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-dfdfff0e-b922-ee78-3407-b87edecb01a4-8098857f"
            )}
          >
            <ItmSecCta
              btnClick={noteAddClick}
              header="Personal"
              eyebrowSrc="make notes to yourself"
              desc="Save bookmarks and jot down meaningful details, hacks, tips and tricks for your future self."
              btnTxtSrc="Note"
              btnIcnSrc="Notes"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-dfdfff0e-b922-ee78-3407-b87edecb01ad-8098857f"
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
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "item-notes")}
              tag="div"
            >
              {note ? (
                <_Builtin.Section
                  className={_utils.cx(_styles, "notes-sec")}
                  grid={{
                    type: "section",
                  }}
                  tag="section"
                >
                  <SecHead
                    titleSrc="My Notes"
                    titleIcn={true}
                    titleIcnSrc="notes"
                    act1={false}
                  />
                  <List listItmMap={noteMap} exampleListItm={false} />
                  <Post
                    post={noteExample}
                    media={true}
                    resp={false}
                    act={false}
                    id="post-note"
                  />
                </_Builtin.Section>
              ) : null}
              {review ? (
                <_Builtin.Section
                  className={_utils.cx(_styles, "notes-sec")}
                  grid={{
                    type: "section",
                  }}
                  tag="section"
                >
                  <SecHead
                    act1={false}
                    titleIcnSrc="star_plus"
                    titleSrc="Reviews"
                    titleIcn={true}
                  />
                  <List listItmMap={reviewMap} exampleListItm={false} />
                  <Post
                    post={reviewExample}
                    resp={false}
                    act={false}
                    rating={true}
                    id="post-review"
                  />
                </_Builtin.Section>
              ) : null}
              {quest ? (
                <_Builtin.Section
                  className={_utils.cx(_styles, "notes-sec")}
                  grid={{
                    type: "section",
                  }}
                  tag="section"
                >
                  <SecHead
                    titleSrc="Q & A"
                    titleIcn={true}
                    titleIcnSrc="quest_ans"
                    act1={false}
                  />
                  <List listItmMap={questMap} exampleListItm={false} />
                  <Post
                    post={questExample}
                    resp={false}
                    act={false}
                    titleSrc="Post Title goes here and line wraps"
                    bodySrc="Answer body of the post goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
                    id="post-qa"
                  />
                </_Builtin.Section>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-dfdfff0e-b922-ee78-3407-b87edecb01d7-8098857f"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "notes-sec")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <SecHead
                titleSrc="Video History"
                titleIcn={true}
                titleIcnSrc="vid"
                act1={false}
              />
              {video ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "col2-aside")}
                  tag="section"
                >
                  <List listItmMap={videoMap} exampleListItm={false} />
                  <VideoItem videoItem={videoExample} />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Section>
            <_Builtin.Section
              className={_utils.cx(_styles, "notes-sec")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <SecHead
                act1={false}
                titleIcnSrc="group"
                titleIcn={true}
                titleSrc="Groups"
              />
              {group ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "col2-aside")}
                  tag="section"
                >
                  <List listItmMap={groupMap} exampleListItm={false} />
                  <MediaItem mediaItem={groupExample} atrbTimeSrc="4d" />
                  <StatsBar
                    stat1Src={groupStat1Src}
                    stat2Src={groupStat2Src}
                    stat4={false}
                    stat3={false}
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
