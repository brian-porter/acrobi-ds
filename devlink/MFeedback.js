"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MFeedback.module.css";

export function MFeedback({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  prodClick = {},
  uxClick = {},
  markClick = {},
  bugClick = {},
  genClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-fb-menu")}
      tag="section"
      id="Feedback"
    >
      <SecHead
        act1Click={cancelClick}
        sz="xl"
        titleSrc="Give Feedback"
        titleSz="h4"
      />
      <MenuItem
        menuItmClick={prodClick}
        pSubtext={true}
        pTitleSrc="Product Feedback"
        pSubtxtSrc="Share your overall satisfaction"
      />
      <MenuItem
        menuItmClick={uxClick}
        pSubtext={true}
        pTitleSrc="User Experience"
        pSubtxtSrc="The look, ease of use, and impressions"
      />
      <MenuItem
        menuItmClick={markClick}
        pSubtext={true}
        pTitleSrc="Market Research"
        pSubtxtSrc="Help guide the decisions we make"
      />
      <MenuItem
        menuItmClick={bugClick}
        pSubtext={true}
        pTitleSrc="Bug Report"
        pSubtxtSrc="Let us know something's broken"
      />
      <MenuItem
        menuItmClick={genClick}
        pSubtext={true}
        pTitleSrc="General Feedback"
        pSubtxtSrc="Any other rantings and ravings"
      />
    </_Component>
  );
}
