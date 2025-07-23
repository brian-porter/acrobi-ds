"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AvatarGroup } from "./AvatarGroup";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PostAtrbItem.module.css";

export function PostAtrbItem({
  as: _Component = _Builtin.Block,
  atrb = true,
  atrbAvtr2 = false,
  atrbAvtr3 = false,
  atrbAvtr4 = false,
  atrbAvtr5 = false,
  atrbName = true,
  atrbNameSrc = "Attributor Name",
  atrbAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr2Alt = "__wf_reserved_inherit",
  atrbAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr3Alt = "__wf_reserved_inherit",
  atrbAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr4Alt = "__wf_reserved_inherit",
  atrbAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr5Alt = "__wf_reserved_inherit",
  atrbClick = {},
  atrbBdg = true,
  atrbBdg1 = true,
  atrbBdg1Icn = false,
  atrbBdg1TxtSrc = "stat",
  atrbBdg1IcnSrc = "view",
  atrbBdg2 = false,
  atrbBdg2Icn = false,
  atrbBdg2TxtSrc = "stat",
  atrbBdg2IcnSrc = "view",
  atrbTime = false,
  atrbTimeSrc = "5d",
}) {
  return atrb ? (
    <_Component className={_utils.cx(_styles, "post-atrb")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "atrb-by")}
        tag="div"
        {...atrbClick}
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
        />
        {atrbName ? (
          <_Builtin.Block className={_utils.cx(_styles, "atrb-name")} tag="div">
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
                lbl={atrbBdg1}
                icn={atrbBdg1Icn}
                lblSz="r4"
                lblClr="n500"
                icnLoc="r"
                lblGap="4"
              />
              <Label
                txtSrc={atrbBdg2TxtSrc}
                icnSrc={atrbBdg2IcnSrc}
                lbl={atrbBdg2}
                icn={atrbBdg2Icn}
                lblSz="r4"
                lblClr="n500"
                icnLoc="r"
                lblGap="4"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {atrbTime ? (
        <_Builtin.Block className={_utils.cx(_styles, "atrb-right")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "atrb-time")} tag="div">
            {atrbTimeSrc}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
