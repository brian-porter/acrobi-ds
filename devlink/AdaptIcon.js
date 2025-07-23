"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { OlTag } from "./OlTag";
import { Badge } from "./Badge";
import * as _utils from "./utils";
import _styles from "./AdaptIcon.module.css";

export function AdaptIcon({
  as: _Component = _Builtin.Block,
  adpt = true,
  bdg = false,
  tag = false,
  adptSz = "m",
  adptShape = "r",
  adptBgClr = "n500",
  icnClr = "n000",
  icnSrc = "Default",
  bdgTxtSrc = "3",
  bdgLoc = "br",
  tagTxtSrc = "3",
  adptGroup,
}) {
  return adpt ? (
    <_Component
      className={_utils.cx(_styles, "adpt_wrap")}
      tag="div"
      data-shape={adptShape}
      data-bg-clr={adptBgClr}
      data-obj-size={adptSz}
      data-overlap={adptGroup}
      data-obj-asp="1-1"
    >
      <Icon icnSrc={icnSrc} icnClr={icnClr} icnSz="" />
      <OlTag tagTxtSrc={tagTxtSrc} tag={tag} tagLoc="tr" />
      <Badge bdgTxtSrc={bdgTxtSrc} bdg={bdg} bdgLoc={bdgLoc} />
    </_Component>
  ) : null;
}
