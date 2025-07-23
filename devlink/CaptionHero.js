"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AvatarGroup } from "./AvatarGroup";
import { Label } from "./Label";
import { LicTrail } from "./LicTrail";
import * as _utils from "./utils";
import _styles from "./CaptionHero.module.css";

export function CaptionHero({
  as: _Component = _Builtin.Block,
  caption = true,
  isVideo = false,
  isOffer = true,
  isList = false,
  titleSrc = "Offer Hook goes here",
  titleSz = "r2",
  titleLc = "1",
  subtxt = false,
  subtxtSrc = "SubTxt here with truncation at one line",
  atrb = true,
  atrbAvtrSz = "m",
  atrbAvtrShape = "r",
  atrbAvtr2 = false,
  atrbAvtr3 = false,
  atrbAvtr4 = false,
  atrbAvtr5 = false,
  atrbAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr2Alt = "__wf_reserved_inherit",
  atrbAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr3Alt = "__wf_reserved_inherit",
  atrbAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr4Alt = "__wf_reserved_inherit",
  atrbAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr5Alt = "__wf_reserved_inherit",
  atrbTime = true,
  atrbTimeSrc = "exp. in 2d",
  atrbName = true,
  atrbNameSrc = "PostbyName",
  atrbBdg = true,
  atrbBdg1 = true,
  atrbBdg1Icn = false,
  atrbBdg1TxtSrc = "limit 2",
  atrbBdg1IcnSrc = "view",
  atrbClick = {},
  captDetClick = {},
  atrbActClick = {},
  pBtmBrdr = "n",
  tBtmBrdr = "n",
}) {
  return caption ? (
    <_Component className={_utils.cx(_styles, "caption-hero")} tag="div">
      {isVideo ? (
        <_Builtin.Block className={_utils.cx(_styles, "capt-video")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "capt-primary-link")}
            tag="div"
            {...captDetClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "capt-lead")}
              tag="div"
            >
              <AvatarGroup
                avtr1Src={atrbAvtrSrc}
                avtr1Alt={atrbAvtrAlt}
                avtr2={atrbAvtr2}
                avtr3={atrbAvtr3}
                avtr4={atrbAvtr4}
                avtr5={atrbAvtr5}
                avtr2Src={atrbAvtr2Src}
                avtr2Alt={atrbAvtr2Alt}
                avtr3Src={atrbAvtr3Src}
                avtr3Alt={atrbAvtr3Alt}
                avtr4Src={atrbAvtr4Src}
                avtr4Alt={atrbAvtr4Alt}
                avtr5Src={atrbAvtr5Src}
                avtr5Alt={atrbAvtr5Alt}
                avtr1Shape={atrbAvtrShape}
                avtrSz="s"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "capt-primary")}
              tag="div"
              data-btm-brdr={pBtmBrdr}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "post-title")}
                tag="div"
                data-lc={titleLc}
                data-lbl-size={titleSz}
              >
                {titleSrc}
              </_Builtin.Block>
              {subtxt ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "postsubtxt")}
                  tag="div"
                >
                  {subtxtSrc}
                </_Builtin.Block>
              ) : null}
              {atrb ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "atrb-by")}
                  tag="div"
                  {...atrbClick}
                >
                  {atrbName ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "atrb-name")}
                      tag="div"
                    >
                      {atrbNameSrc}
                    </_Builtin.Block>
                  ) : null}
                  {atrbBdg ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "atrb-badges")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "atrb-stats")}
                        tag="div"
                      >
                        <Label
                          txtSrc={atrbBdg1TxtSrc}
                          icnSrc={atrbBdg1IcnSrc}
                          lblSz="r4"
                          lblClr="n500"
                          icnLoc="r"
                          lblGap="4"
                          lbl={true}
                          icn={true}
                        />
                        <Label
                          txtSrc={atrbTimeSrc}
                          lblSz="r4"
                          lblClr="n500"
                          icnLoc="r"
                          icnSrc="view"
                          lblGap="4"
                          lbl={false}
                          icn={false}
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <LicTrail
            actLbl2Txt={atrbTime}
            trailDiv={tBtmBrdr}
            trailClick={atrbActClick}
            actLbl2TxtSrc={atrbTimeSrc}
            actLbl2={true}
            actLbl2Icn={false}
            actLbl1Sz="r2"
            actLbl1Clr="n300"
            act={true}
          />
        </_Builtin.Block>
      ) : null}
      {isOffer ? (
        <_Builtin.Block className={_utils.cx(_styles, "capt-offer")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "capt-primary-link")}
            tag="div"
            {...captDetClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "capt-lead")}
              tag="div"
            >
              <AvatarGroup
                avtr1Src={atrbAvtrSrc}
                avtr1Alt={atrbAvtrAlt}
                avtr1Shape={atrbAvtrShape}
                avtrSz={atrbAvtrSz}
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "capt-off-primary")}
              tag="div"
              data-btm-brdr="n"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "post-title")}
                tag="div"
                data-lc={titleLc}
                data-lbl-size={titleSz}
              >
                {titleSrc}
              </_Builtin.Block>
              {subtxt ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "postsubtxt")}
                  tag="div"
                >
                  {subtxtSrc}
                </_Builtin.Block>
              ) : null}
              {atrb ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "atrb-by")}
                  tag="div"
                  {...atrbClick}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "atrb-name")}
                    tag="div"
                  >
                    {atrbNameSrc}
                  </_Builtin.Block>
                  {atrbBdg ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "atrb-badges")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "atrb-stats")}
                        tag="div"
                      >
                        <Label
                          txtSrc={atrbBdg1TxtSrc}
                          lbl={atrbBdg1}
                          icnSrc={atrbBdg1IcnSrc}
                          icn={atrbBdg1Icn}
                          lblSz="r4"
                          lblClr="n500"
                          icnLoc="r"
                          lblGap="4"
                        />
                        <Label
                          lblSz="r4"
                          lblClr="n500"
                          icnLoc="r"
                          icnSrc="default"
                          txtSrc="stat"
                          lblGap="4"
                          lbl={false}
                          icn={false}
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <LicTrail
            actLbl2Txt={atrbTime}
            trailClick={atrbActClick}
            actLbl2TxtSrc={atrbTimeSrc}
            actLbl2={true}
            actLbl2Icn={false}
            actLbl1Sz="h5"
            trailDiv="n"
            actLbl1Clr="p500"
            act={true}
            actLbl1IcnSrc="addcirc"
            actLbl1TxtSrc="Add"
          />
        </_Builtin.Block>
      ) : null}
      {isList ? (
        <_Builtin.Block className={_utils.cx(_styles, "capt-list")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "capt-primary-link")}
            tag="div"
            {...captDetClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "capt-lead")}
              tag="div"
            >
              <AvatarGroup
                avtr1Src={atrbAvtrSrc}
                avtr1Alt={atrbAvtrAlt}
                avtr1Shape={atrbAvtrShape}
                avtr2={false}
                avtr3={false}
                avtr4={false}
                avtr5={false}
                avtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                avtr2Alt="__wf_reserved_inherit"
                avtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                avtr3Alt="__wf_reserved_inherit"
                avtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                avtr4Alt="__wf_reserved_inherit"
                avtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                avtr5Alt="__wf_reserved_inherit"
                avtrSz="s"
                avtrGrp={true}
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "capt-primary")}
              tag="div"
              data-btm-brdr="n"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "list-title")}
                tag="div"
                data-lc={titleLc}
                data-lbl-size={titleSz}
              >
                {titleSrc}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "atrb-by")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "atrb-name")}
                  tag="div"
                >
                  {atrbNameSrc}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "atrb-badges")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "atrb-stats")}
                    tag="div"
                  >
                    <Label
                      lblSz="r4"
                      lblClr="n500"
                      icnLoc="r"
                      icnSrc="default"
                      txtSrc="stat"
                      lblGap="4"
                      lbl={false}
                      icn={false}
                    />
                    <Label
                      lblSz="r4"
                      lblClr="n500"
                      icnLoc="r"
                      icnSrc="default"
                      txtSrc="stat"
                      lblGap="4"
                      lbl={false}
                      icn={false}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <LicTrail
            trailClick={atrbActClick}
            actLbl2TxtSrc={atrbTimeSrc}
            actLbl2={atrbTime}
            actLbl2Txt={true}
            actLbl2Icn={false}
            actLbl1Sz="h5"
            trailDiv="n"
            actLbl1Clr="p500"
            act={true}
            actLbl1IcnSrc="addcirc"
            actLbl1TxtSrc="Add"
            actLbl1Icn={true}
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
