"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Avatar } from "./Avatar";
import * as _utils from "./utils";
import _styles from "./OlAvtr.module.css";

export function OlAvtr({
  as: _Component = _Builtin.Block,
  avtr = true,
  avtrBdg = false,
  hline = false,
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAlt = "__wf_reserved_inherit",
  avtrSz = "xl",
  avtrShape = "c",
  avtrLoc = "bl",
  avtrClick = {},
  avtrBdgIcn = true,
  avtrBdgTxt = false,
  avtrBdgTxtSrc = "3",
  avtrBdgIcnSrc = "Edit",
  avtrBdgSz = "l",
  avtrBdgIcnSz = "r4",
  avtrBdgClr = "fd500",
  hlineTitleSrc = "FName LName",
  hlineSubTxtSrc = "@handle",
  hlineTitleClr = "n000",
  hlineTitleSz = "h3",
  hlineTitleDrpShdw = "bold",
  hlineSubTxtClr = "n000",
  hlineSubTxtSz = "r2",
  hlineSubTxtDrpShdw = "bold",
  hlineSubTxt2 = false,
  hlineSubTxt2Src = "subtxt2",
  hlineSubTxt2Clr = "n000",
  hlineSubTxt2DrpShdw = "bold",
  hlineSubTxt2Sz = "r2",
}) {
  return avtr ? (
    <_Component
      className={_utils.cx(_styles, "ol-avtr")}
      tag="div"
      data-loc={avtrLoc}
    >
      <Avatar
        avtrSz={avtrSz}
        bdgSz={avtrBdgSz}
        bdgIcn={avtrBdgIcn}
        bdgTxt={avtrBdgTxt}
        bdgIcnSrc={avtrBdgIcnSrc}
        bdg={avtrBdg}
        bdgClr={avtrBdgClr}
        bdgTxtSrc={avtrBdgTxtSrc}
        avtrClick={avtrClick}
        avtrSrc={avtrSrc}
        avtrAlt={avtrAlt}
        avtrShape={avtrShape}
        bdgIcnSz={avtrBdgIcnSz}
        avtrDrpShdw="m"
        avtrLink="true"
      />
      {hline ? (
        <_Builtin.Block className={_utils.cx(_styles, "avtr-txt")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "headline")}
            tag="div"
            data-clr={hlineTitleClr}
            data-fs={hlineTitleSz}
            data-ts={hlineTitleDrpShdw}
          >
            {hlineTitleSrc}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "subtxt")}
            tag="div"
            data-clr={hlineSubTxtClr}
            data-ts={hlineSubTxtDrpShdw}
            data-fs={hlineSubTxtSz}
          >
            {hlineSubTxtSrc}
          </_Builtin.Block>
          {hlineSubTxt2 ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "subtxt")}
              tag="div"
              data-clr={hlineSubTxt2Clr}
              data-ts={hlineSubTxt2DrpShdw}
              data-fs={hlineSubTxt2Sz}
            >
              {hlineSubTxt2Src}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
