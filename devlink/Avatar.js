"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Badge } from "./Badge";
import * as _utils from "./utils";
import _styles from "./Avatar.module.css";

export function Avatar({
  as: _Component = _Builtin.Block,
  avtr = true,
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAlt = "__wf_reserved_inherit",
  avtrSz = "s",
  avtrShape = "c",
  avtrDrpShdw,
  avtrGroup,
  avtrLink,
  avtrClick = {},
  bdg = false,
  bdgTxt = true,
  bdgIcn = false,
  bdgTxtSrc = "3",
  bdgIcnSrc = "Default",
  bdgClr = "fd500",
  bdgSz = "m",
  bdgIcnSz = "r4",
  bdgLoc = "br",
  avtrOn,
}) {
  return avtr ? (
    <_Component
      className={_utils.cx(_styles, "avtr_wrap")}
      tag="div"
      data-obj-size={avtrSz}
      data-overlap={avtrGroup}
      data-obj-link={avtrLink}
      data-obj-on={avtrOn}
      data-shape={avtrShape}
      {...avtrClick}
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "avtr-img")}
        loading="lazy"
        width="auto"
        height="auto"
        data-shape={avtrShape}
        data-obj-asp="1-1"
        data-bs={avtrDrpShdw}
        src={avtrSrc}
      />
      <Badge
        bdgIcnSrc={bdgIcnSrc}
        bdgIcn={bdgIcn}
        bdgSz={bdgSz}
        bdgTxt={bdgTxt}
        bdgClr={bdgClr}
        bdgTxtSrc={bdgTxtSrc}
        bdg={bdg}
        bdgIcnSz={bdgIcnSz}
        bdgLoc={bdgLoc}
      />
    </_Component>
  ) : null;
}
