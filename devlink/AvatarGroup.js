"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Avatar } from "./Avatar";
import * as _utils from "./utils";
import _styles from "./AvatarGroup.module.css";

export function AvatarGroup({
  as: _Component = _Builtin.Block,
  avtrGrp = true,
  avtr2 = false,
  avtr3 = false,
  avtr4 = false,
  avtr5 = false,
  avtrSz = "xs",
  avtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr1Alt = "__wf_reserved_inherit",
  avtr1Shape = "c",
  grpShp = "c",
  avtr1Bdg = false,
  avtr1BdgClr = "off",
  avtr1BdgSz = "m",
  avtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr2Alt = "__wf_reserved_inherit",
  avtr2Bdg = false,
  avtr2BdgClr = "off",
  avtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr3Alt = "__wf_reserved_inherit",
  avtr3Bdg = false,
  avtr3BdgClr = "off",
  avtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr4Alt = "__wf_reserved_inherit",
  avtr4Bdg = false,
  avtr4BdgClr = "off",
  avtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr5Alt = "__wf_reserved_inherit",
  avtr5Bdg = false,
  avtr5BdgClr = "off",
}) {
  return avtrGrp ? (
    <_Component
      className={_utils.cx(_styles, "avtr_group")}
      tag="div"
      data-group-size={avtrSz}
      data-group-shape={grpShp}
    >
      <Avatar
        avtr={avtr5}
        bdg={avtr5Bdg}
        bdgClr={avtr5BdgClr}
        avtrSrc={avtr5Src}
        avtrAlt={avtr5Alt}
        avtrGroup="true"
        bdgTxt={false}
      />
      <Avatar
        avtr={avtr4}
        bdg={avtr4Bdg}
        bdgClr={avtr4BdgClr}
        avtrSrc={avtr4Src}
        avtrAlt={avtr4Alt}
        avtrGroup="true"
        bdgTxt={false}
      />
      <Avatar
        avtr={avtr3}
        bdg={avtr3Bdg}
        bdgClr={avtr3BdgClr}
        avtrSrc={avtr3Src}
        avtrAlt={avtr3Alt}
        avtrGroup="true"
        bdgTxt={false}
      />
      <Avatar
        avtr={avtr2}
        bdg={avtr2Bdg}
        bdgClr={avtr2BdgClr}
        avtrSrc={avtr2Src}
        avtrAlt={avtr2Alt}
        avtrGroup="true"
        bdgTxt={false}
      />
      <Avatar
        bdg={avtr1Bdg}
        bdgClr={avtr1BdgClr}
        avtrSrc={avtr1Src}
        avtrAlt={avtr1Alt}
        bdgSz={avtr1BdgSz}
        avtrShape={avtr1Shape}
        avtrGroup="true"
        bdgTxt={false}
      />
    </_Component>
  ) : null;
}
