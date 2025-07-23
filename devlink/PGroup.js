"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MediaHero } from "./MediaHero";
import { Headline } from "./Headline";
import { Button } from "./Button";
import { Paragraph } from "./Paragraph";
import { TableRow } from "./TableRow";
import { SecHead } from "./SecHead";
import { SnipSecRooms } from "./SnipSecRooms";
import { SnipSecMedia } from "./SnipSecMedia";
import { SnipSecAttachments } from "./SnipSecAttachments";
import { SnipSecMembers } from "./SnipSecMembers";
import * as _utils from "./utils";
import _styles from "./PGroup.module.css";

export function PGroup({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif",
  heroImgAlt = "__wf_reserved_inherit",
  itmGttrPin = false,
  itmGttrBkmrk = false,
  qrClick = {},
  moreClick = {},
  actClick = {},
  ruleClick = {},
  groupType = "GroupType",
  groupName = "GroupName that is longer will need to wrap",
  groupHndl = "@handle",
  groupDesc = "The description of the group goes in this location what happens when it is long what happens when it is long",
  mbrSrc = "126",
  locationSrc = "LocationDetails",
  privacySrc = "Community",
  estSrc = "Oct. 2024",
  announce = true,
  announceSrc = "Any announcement the admin wants to give to the group goes in this location what happens when it is long what happens when it is long",
  rmAdd = false,
  rmAddClick = {},
  rmMap,
  rmExample = true,
  rmStat1Src = "{XXX} messages",
  rmStat2Src = "{X} likes",
  rmStat3Src = "{XX} peeps",
  mediaAdd = false,
  mediaAddClick = {},
  mediaMap,
  mediaExample = false,
  mediaStat1Src = "{XXX} photos",
  mediaStat2Src = "{X} videos",
  mediaStat3Src = "{XX} peeps",
  atchAdd = false,
  atchAddClick = {},
  atchListMap,
  atchPlaceMap,
  atchPlaceExample = true,
  atchStat1Src = "stat1",
  atchStat2Src = "stat2",
  atchStat3Src = "stat3",
  mbrAdd = false,
  mbrAddClick = {},
  mbrAdminAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  mbrAdminAvtrAlt = "__wf_reserved_inherit",
  mbrAdminTitle = "{AdminName}",
  mbrAdminHndl = "@handle",
  mbrMap,
  mbrExample = true,
  mbrStat1Src = "{X} family",
  mbrStat2Src = "{X} friends",
  mbrStat3Src = "{X} overall",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-header")}
          id={_utils.cx(
            _styles,
            "w-node-_7e141701-6257-fc85-c9cd-055576421e56-49b47882"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_7e141701-6257-fc85-c9cd-055576421e57-49b47882"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "hero_sec")}
              tag="section"
              grid={{
                type: "section",
              }}
            >
              <MediaHero
                vizImgSrc={heroImgSrc}
                vizImgAlt={heroImgAlt}
                vizQrClick={qrClick}
                vizMoreClick={moreClick}
                gttrPin={itmGttrPin}
                gttrBkmrk={itmGttrBkmrk}
                titleSrc="GroupName here with truncation at one line"
                titleSz="r1"
                atrbTime={false}
                subtxt={true}
                atrbBdg1IcnSrc="member"
                atrbBdg1TxtSrc="126"
                capt={false}
                vizIcnBar={true}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_7e141701-6257-fc85-c9cd-055576421e62-49b47882"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "act-sec")}
              tag="section"
              grid={{
                type: "section",
              }}
            >
              <_Builtin.Layout
                className={_utils.cx(_styles, "qs-action")}
                id={_utils.cx(
                  _styles,
                  "w-node-_9f4852f0-3029-6dff-0396-8d92d00489c9-49b47882"
                )}
              >
                <_Builtin.Cell
                  className={_utils.cx(_styles, "act-name")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_9f4852f0-3029-6dff-0396-8d92d00489ca-49b47882"
                  )}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "sec-cta-sub")}
                    tag="div"
                    data-lc="1"
                  >
                    {groupType}
                  </_Builtin.Block>
                  <Headline
                    titleSrc={groupName}
                    subtxtSrc={groupHndl}
                    titleSz="h4"
                    titleH="h4"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  className={_utils.cx(_styles, "act-btns")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_9f4852f0-3029-6dff-0396-8d92d00489d0-49b47882"
                  )}
                >
                  <Button
                    btnClick={actClick}
                    btnSz="l"
                    btnTxtSrc="Join"
                    btnIcnSrc="Addcirc"
                    btnStyl="pf"
                    disabled="false"
                  />
                  <Button
                    btnClick={ruleClick}
                    btnSz="s"
                    btnTxtSrc="Rules"
                    btnStyl="ft"
                    btnIcn={false}
                    lblSz="r3"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  className={_utils.cx(_styles, "act-expand")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_9f4852f0-3029-6dff-0396-8d92d00489d6-49b47882"
                  )}
                >
                  <Paragraph bodySrc={groupDesc} fontSz="r3" fontClr="n700" />
                </_Builtin.Cell>
                <_Builtin.Cell
                  className={_utils.cx(_styles, "act-expand")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_9f4852f0-3029-6dff-0396-8d92d00489d9-49b47882"
                  )}
                >
                  <TableRow
                    col2TxtSrc={mbrSrc}
                    col1Icn={true}
                    col1IcnSrc="member"
                    col1TxtSrc="Members"
                  />
                  <TableRow
                    col2TxtSrc={locationSrc}
                    col2Align="l"
                    col1Icn={true}
                    col1IcnSrc="geo_home"
                    col1TxtSrc="Location"
                  />
                  <TableRow
                    col2TxtSrc={privacySrc}
                    col2Align="l"
                    col1Icn={true}
                    col1IcnSrc="lock_key"
                    col1TxtSrc="Privacy"
                  />
                  <TableRow
                    col2TxtSrc={estSrc}
                    col2Align="l"
                    col1Icn={true}
                    col1IcnSrc="cal"
                    col1TxtSrc="Established"
                  />
                </_Builtin.Cell>
                {announce ? (
                  <_Builtin.Cell
                    className={_utils.cx(_styles, "act-expand")}
                    id={_utils.cx(
                      _styles,
                      "w-node-_9f4852f0-3029-6dff-0396-8d92d00489ea-49b47882"
                    )}
                  >
                    <SecHead
                      titleSrc="Announcement"
                      act1TxtSrc="Add"
                      sz="m"
                      titleIcn={true}
                      titleIcnSrc="annouce"
                      act1Click={{}}
                      act1IcnSrc="Add"
                      act1Icn={false}
                      act1Txt={false}
                      act1={true}
                    />
                    <Paragraph
                      bodySrc={announceSrc}
                      fontSz="r3"
                      fontClr="n700"
                    />
                  </_Builtin.Cell>
                ) : null}
              </_Builtin.Layout>
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-fb9ce2e4-ae6f-0612-34fa-6e8d9dd4fb0d-49b47882"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-fb9ce2e4-ae6f-0612-34fa-6e8d9dd4fb0e-49b47882"
            )}
          >
            <SnipSecRooms
              secHeadAct1Click={rmAddClick}
              secHeadAct1={rmAdd}
              conSec1Map={rmMap}
              conExampleSec1Room={rmExample}
              stat1Src={rmStat1Src}
              stat2Src={rmStat2Src}
              stat3Src={rmStat3Src}
            />
            <SnipSecMedia
              conSec1HeadAct1Click={mediaAddClick}
              conSec1HeadAct1={mediaAdd}
              conSec1Map={mediaMap}
              conExampleCellMedia={mediaExample}
              stat1Src={mediaStat1Src}
              stat2Src={mediaStat2Src}
              stat3Src={mediaStat3Src}
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-fb9ce2e4-ae6f-0612-34fa-6e8d9dd4fb0f-49b47882"
            )}
          >
            <SnipSecAttachments
              secHeadAct1Click={atchAddClick}
              secHeadAct1={atchAdd}
              conSec2Map={atchPlaceMap}
              conExampleSec2Place={atchPlaceExample}
              stat1Src={atchStat1Src}
              stat2Src={atchStat2Src}
              stat3Src={atchStat3Src}
              conSec1Map={atchListMap}
            />
            <SnipSecMembers
              secHeadAct1Click={mbrAddClick}
              secHeadAct1={mbrAdd}
              conAdminAvtrSrc={mbrAdminAvtrSrc}
              conAdminAvtrAlt={mbrAdminAvtrAlt}
              conAdminTitleSrc={mbrAdminTitle}
              conAdminHndlSrc={mbrAdminHndl}
              stat1Src={mbrStat1Src}
              stat2Src={mbrStat2Src}
              stat3Src={mbrStat3Src}
              conSec1Map={mbrMap}
              conExampleSec1Members={mbrExample}
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
