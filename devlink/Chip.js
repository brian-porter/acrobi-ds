"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { Icon } from "./Icon";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import * as _utils from "./utils";
import _styles from "./Chip.module.css";

export function Chip({
  as: _Component = _Builtin.Block,
  chip = true,
  base = true,
  avtr = false,
  chipActive = "false",
  chipIcn = true,
  chipTxt = true,
  chipIcnSrc = "default",
  chipTxtSrc = "Chip",
  chipStyle = "nl",
  chipTxtSz = "r3",
  chipTrail = false,
  chipTrailSrc = "select_arrrow",
  chipDisabled,
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrBdg = false,
  avtrBdgIcnSrc = "Admin",
  avtrBdgClr = "yellow-700",
  avtrTxtSrc = "FName LI",
  avtrTrailSrc = "clearcirc",
  chipId = "chip",
  chipClick = {},
}) {
  return chip ? (
    <_Component
      className={_utils.cx(_styles, "chip_wrap")}
      tag="div"
      data-chip-style={chipStyle}
      data-shape="pill"
      data-chip-active={chipActive}
      x-disabled={chipDisabled}
      id={chipId}
      {...chipClick}
    >
      {base ? (
        <_Builtin.Block className={_utils.cx(_styles, "chip-base")} tag="div">
          <Label
            txtSrc={chipTxtSrc}
            icn={chipIcn}
            txt={chipTxt}
            icnSrc={chipIcnSrc}
            lblSz={chipTxtSz}
          />
          <Icon
            icnSrc={chipTrailSrc}
            icn={chipTrail}
            icnSz="xs"
            icnClr="n500"
          />
        </_Builtin.Block>
      ) : null}
      {avtr ? (
        <_Builtin.Block className={_utils.cx(_styles, "chip-avtr")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "chip-avtr-wrap")}
            tag="div"
          >
            <Avatar
              avtrSrc={avtrSrc}
              avtrSz="s"
              avtr={true}
              bdg={false}
              bdgTxt={false}
              bdgIcn={true}
              bdgClr="yellow-700"
              bdgIcnSrc="Admin"
              bdgIcnSz="r4"
            />
            <Badge
              bdgIcnSrc={avtrBdgIcnSrc}
              bdgClr={avtrBdgClr}
              bdg={avtrBdg}
              bdgTxt={false}
              bdgIcn={true}
              bdgIcnSz="r4"
            />
          </_Builtin.Block>
          <Label
            txtSrc={avtrTxtSrc}
            lblGap="4"
            icnLoc="l"
            icnSrc="default"
            lblSz="r3"
            icn={false}
          />
          {chipTrail ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "chip-avtr-trail")}
              tag="div"
            >
              <Icon icnSrc={avtrTrailSrc} icnSz="xs" icnClr="n500" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
