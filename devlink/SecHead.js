"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { LicLead } from "./LicLead";
import { Label } from "./Label";
import { ActionBar } from "./ActionBar";
import * as _utils from "./utils";
import _styles from "./SecHead.module.css";

export function SecHead({
  as: _Component = _Builtin.Block,
  secHead = true,
  gttrBdgPin = false,
  gttrBdgAlarm = false,
  gttrBdgBkmrk = false,
  titleIcn = false,
  titleAvtr = false,
  subtxt = false,
  act1 = true,
  act1Txt = true,
  act1Icn = false,
  act2 = false,
  act2Txt = false,
  act2Icn = true,
  sz = "m",
  titleIcnSrc = "default",
  titleIcnClr = "n500",
  titleIcnSz = "s",
  titleAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  titleAvtrAlt = "__wf_reserved_inherit",
  titleAvtr2 = false,
  titleAvtr3 = false,
  titleAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  titleAvtr2Alt = "__wf_reserved_inherit",
  titleAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  titleAvtr3Alt = "__wf_reserved_inherit",
  titleSrc = "Section Header",
  titleClr = "in",
  titleSz = "r2",
  titleGap = "8",
  subtxtSrc = "Subtext goes here",
  subtxtSz = "r4",
  subtxtClr = "n700",
  act1TxtSrc = "Cancel",
  act1IcnSrc = "default",
  act1Styl = "ft",
  act1Clr = "in",
  act1IcnLoc = "l",
  act2TxtSrc = "Action2",
  act2IcnSrc = "default",
  act2IcnLoc = "l",
  act2Styl = "nt",
  act2Clr = "in",
  titleClick = {},
  act1Click = {},
  act2Click = {},
  isSecHead = "true",
}) {
  return secHead ? (
    <_Component
      className={_utils.cx(_styles, "shead")}
      tag="div"
      data-sechead="true"
    >
      <GutterBadge
        pin={gttrBdgPin}
        alarm={gttrBdgAlarm}
        bookmark={gttrBdgBkmrk}
        gttrBdg={false}
      />
      <LicLead
        icnSrc={titleIcnSrc}
        icn={titleIcn}
        icnClr={titleIcnClr}
        icnSz={titleIcnSz}
        avtr={titleAvtr}
        avtrSrc={titleAvtrSrc}
        avtrAlt={titleAvtrAlt}
        avtr2={titleAvtr2}
        avtr3={titleAvtr3}
        avtr2Src={titleAvtr2Src}
        avtr2Alt={titleAvtr2Alt}
        avtr3Src={titleAvtr3Src}
        avtr3Alt={titleAvtr3Alt}
        isSecHead={isSecHead}
        img={false}
        imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
        adptIcn={false}
        adptIcnSrc="Default"
        imgSz="l"
        imgAlt="__wf_reserved_inherit"
        adptSz="m"
        adptBgClr="n500"
        avtrSz="s"
        leadDiv=""
        avtrBdg={false}
        avtrBdgClr="fd500"
        avtr4={false}
        avtr5={false}
        avtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        avtr4Alt="__wf_reserved_inherit"
        avtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
        avtr5Alt="__wf_reserved_inherit"
        rdio={false}
        rdioIcn="rdio_off"
        rdioClr="n300"
        rdioSz="m"
        rdioClick={{}}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-title")}
        tag="div"
        {...titleClick}
      >
        <Label
          txtSrc={titleSrc}
          lblClr={titleClr}
          lblSz={titleSz}
          lblGap={titleGap}
          icn={false}
          icnSrc="default"
        />
        {subtxt ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "subtxt")}
            tag="div"
            data-lbl-size={subtxtSz}
            data-clr={subtxtClr}
          >
            {subtxtSrc}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <ActionBar
        act1TxtSrc={act1TxtSrc}
        act1={act1}
        act1Icn={act1Icn}
        act1Txt={act1Txt}
        act1IcnSrc={act1IcnSrc}
        act1Styl={act1Styl}
        act1Click={act1Click}
        act2Click={act2Click}
        act2={act2}
        act2Txt={act2Txt}
        act2Icn={act2Icn}
        act2IcnSrc={act2IcnSrc}
        act2TxtSrc={act2TxtSrc}
        act1Clr={act1Clr}
        act1IcnLoc={act1IcnLoc}
        act2IcnLoc={act2IcnLoc}
        act2Styl={act2Styl}
        act2Clr={act2Clr}
      />
    </_Component>
  ) : null;
}
