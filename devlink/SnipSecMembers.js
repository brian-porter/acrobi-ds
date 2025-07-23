"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { LicLead } from "./LicLead";
import { Icon } from "./Icon";
import { LicTrail } from "./LicTrail";
import { SecPeep } from "./SecPeep";
import * as _utils from "./utils";
import _styles from "./SnipSecMembers.module.css";

export function SnipSecMembers({
  as: _Component = _Builtin.Section,
  secHeadTitleIcn = true,
  secHeadAct1 = true,
  secHeadAct1Txt = false,
  secHeadAct1Icn = true,
  conAdminAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  conAdminAvtrAlt = "__wf_reserved_inherit",
  conAdminTitleSrc = "{AdminName}",
  conAdminHndlSrc = "@handle",
  conSec1Map,
  conExampleSec1Members = true,
  exSec1Sec1VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exSec1Sec1VizAlt = "__wf_reserved_inherit",
  exSec1Sec1TitleSrc = "FName",
  exSec1Sec1CellClick = {},
  stat1Src = "{X} family",
  stat2Src = "{X} friends",
  stat3Src = "{X} overall",
  sec = true,
  secHead = false,
  stats = true,
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = false,
  secHeadTitleIcnSrc = "connect",
  secHeadTitleSrc = "Members",
  secHeadAct1TxtSrc = "Add",
  secHeadAct1IcnSrc = "Add",
  secHeadAct1Click = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "memb-sec")}
      tag="section"
      grid={{
        type: "section",
      }}
    >
      <SecHead
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1IcnSrc={secHeadAct1IcnSrc}
        act1Icn={secHeadAct1Icn}
        act1Txt={secHeadAct1Txt}
        secHead={secHead}
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        <SecHead
          act1Click={secHeadAct1Click}
          act1={secHeadAct1}
          titleSrc="Members"
          act1TxtSrc="Add"
          sz="m"
          titleIcn={true}
          titleIcnSrc="connect"
          act1IcnSrc="Add"
          act1Icn={true}
          act1Txt={false}
          secHead={true}
        />
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "list_item_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "lic-primary-wrap")}
              tag="div"
            >
              <LicLead
                avtrSrc={conAdminAvtrSrc}
                avtrAlt={conAdminAvtrAlt}
                icnSrc="default"
                icn={false}
                img={false}
                imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                adptIcn={false}
                adptIcnSrc="Default"
                avtr={true}
                icnClr="p500"
                icnSz="s"
                imgSz="l"
                imgAlt="__wf_reserved_inherit"
                adptSz="m"
                adptBgClr="n500"
                avtrSz="l"
                leadDiv=""
                avtrBdg={false}
                avtrBdgClr="fd500"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "li-primary")}
                tag="div"
                btm-brdr="y"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "lic-prime-titlesubtxt")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "li-prime-title")}
                    tag="div"
                    data-fs="r2"
                    data-clr="n900"
                    data-lc="1"
                  >
                    {conAdminTitleSrc}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-74")}
                    tag="div"
                  >
                    <Icon icnClr="yellow-700" icnSrc="Admin" />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "li-prime-admin-handle")}
                      tag="div"
                      data-fs="r3"
                      data-clr="n700"
                      data-lc="1"
                    >
                      {conAdminHndlSrc}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <LicTrail
              suprAct={false}
              icnSrc="Moreh"
              actLbl2TxtSrc="pts {point-amt}"
              actLbl2={true}
              togl={false}
              actLbl1IcnSrc="Moreh"
              actLbl1Clr="in"
              actLbl1Icn={false}
              actLbl1Txt={true}
              actLbl1TxtSrc="est {year}"
              actLbl2Clr="in"
              actLbl2Icn={false}
              actLbl2IcnSrc="default"
              actLbl2Txt={true}
              btn={false}
              actLbl1Sz="r3"
              btnTxtSrc="Button"
              btnIcn={false}
              btnTxt={true}
              btnIconSrc="default"
              btnSz="s"
              btnStyl="nl"
              btnClick={{}}
              trailDiv="y"
              rdio={false}
              rdioSrc="circ_off"
              rdioClr="n300"
              toglValue=""
              toglClick={{}}
              trailClick={{}}
              icn={false}
              act={false}
            />
          </_Builtin.Block>
          <SecPeep
            stat1Src={stat1Src}
            stat2Src={stat2Src}
            stat3Src={stat3Src}
            conCellMap={conSec1Map}
            conExampleCell={conExampleSec1Members}
            exampleTitleSrc={exSec1Sec1TitleSrc}
            stat3={stat3}
            stats={stats}
            stat4Src={stat4Src}
            stat2={stat2}
            stat4={stat4}
            exampleVizSrc={exSec1Sec1VizSrc}
            exampleVizAlt={exSec1Sec1VizAlt}
            exampleCellClick={exSec1Sec1CellClick}
            secHead={false}
            conSideFade={false}
            exampleBtn={false}
            exampleCaptSubtxt={false}
            exampleCellSz="l"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
