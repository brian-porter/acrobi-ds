"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AdaptIcon } from "./AdaptIcon";
import * as _utils from "./utils";
import _styles from "./AdaptIconGroup.module.css";

export function AdaptIconGroup({
  as: _Component = _Builtin.Block,
  adpt1 = true,
  adpt2 = true,
  adpt3 = false,
  adpt4 = false,
  adpt5 = false,
  adpt1IcnSrc = "Default",
  adpt1BgClr = "n300",
  adpt2BgClr = "n300",
  adpt2CnSrc = "Default",
  adpt3BgClr = "n300",
  adpt3IcnSrc = "Default",
  adpt4BgClr = "n300",
  adpt4IcnSrc = "Default",
  adpt5BgClr = "n500",
  adpt5IcnSrc = "Default",
  grpSz = "xs",
  grpShp = "r",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "adpt_group")}
      tag="div"
      data-group-size={grpSz}
      data-group-shape={grpShp}
    >
      <AdaptIcon
        adpt={adpt5}
        adptBgClr={adpt5BgClr}
        icnSrc={adpt5IcnSrc}
        adptSz="s"
        adptGroup="true"
        adptShape="in"
      />
      <AdaptIcon
        adpt={adpt4}
        adptBgClr={adpt4BgClr}
        icnSrc={adpt4IcnSrc}
        adptSz="s"
        adptGroup="true"
        adptShape="in"
      />
      <AdaptIcon
        adpt={adpt3}
        adptBgClr={adpt3BgClr}
        icnSrc={adpt3IcnSrc}
        adptSz="s"
        adptGroup="true"
        adptShape="in"
      />
      <AdaptIcon
        adpt={adpt2}
        adptBgClr={adpt2BgClr}
        icnSrc={adpt2CnSrc}
        adptSz="s"
        adptGroup="true"
        adptShape="in"
      />
      <AdaptIcon
        adptBgClr={adpt1BgClr}
        icnSrc={adpt1IcnSrc}
        adpt={adpt1}
        adptGroup="true"
        adptSz="s"
        adptShape="in"
      />
    </_Component>
  );
}
