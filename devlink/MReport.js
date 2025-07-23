"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MReport.module.css";

export function MReport({
  as: _Component = _Builtin.Block,
  spamClick = {},
  pornClick = {},
  harmClick = {},
  medClick = {},
  hateClick = {},
  goodsClick = {},
  privClick = {},
  violenceClick = {},
  propClick = {},
  cancelClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-report-menu")} tag="section">
      <SecHead
        act1Click={cancelClick}
        sz="xl"
        titleSrc="Report for"
        titleSz="h4"
      />
      <MenuItem
        menuItmClick={spamClick}
        pSubtext={true}
        pTitleSrc="Spam"
        pSubtxtSrc="Misleading or repetitive posts"
      />
      <MenuItem
        menuItmClick={pornClick}
        pSubtext={true}
        pTitleSrc="Nudity or pornography"
        pSubtxtSrc="Sexually explicit content"
      />
      <MenuItem
        menuItmClick={harmClick}
        pSubtext={true}
        pTitleSrc="Self-harm"
        pSubtxtSrc="Eating disorders, cutting, suicide"
      />
      <MenuItem
        menuItmClick={medClick}
        pSubtext={true}
        pTitleSrc="Medical misinformation"
        pSubtxtSrc="Harmful content about health and safety"
      />
      <MenuItem
        menuItmClick={hateClick}
        pSubtext={true}
        pTitleSrc="Hate speech or symbols"
        pSubtxtSrc="Attacks directed at protected groups"
      />
      <MenuItem
        menuItmClick={goodsClick}
        pSubtext={true}
        pTitleSrc="Dangerous goods"
        pSubtxtSrc="Drugs, weapons, regulated products"
      />
      <MenuItem
        menuItmClick={privClick}
        pSubtext={true}
        pTitleSrc="Harassment or privacy violations"
        pSubtxtSrc="Threats, blackmail, personal attacks"
      />
      <MenuItem
        menuItmClick={violenceClick}
        pSubtext={true}
        pTitleSrc="Graphic violence"
        pSubtxtSrc="Violent images or promotion of violence"
      />
      <MenuItem
        menuItmClick={propClick}
        pSubtext={true}
        pTitleSrc="My intellectual property"
        pSubtxtSrc="Copyright or trademark infrigement"
      />
    </_Component>
  );
}
