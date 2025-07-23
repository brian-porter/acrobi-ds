"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { MenuItem } from "./MenuItem";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MPriority.module.css";

export function MPriority({
  as: _Component = _Builtin.Block,
  highestClick = {},
  highestOn = false,
  highClick = {},
  highOn = false,
  mediumClick = {},
  mediumOn = false,
  lowClick = {},
  lowOn = false,
  lowestClick = {},
  lowestOn = false,
  noneClick = {},
  noneOn = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-priority")}
      tag="section"
      id="Priority"
    >
      <HeroStack
        headlineSrc="Priority"
        subtxtSrc="Remind yourself and let others know the importance of this {ObjectType}"
        icnSrc="flag"
        icn={true}
        img={false}
      />
      <MenuItem
        tSelected={highestOn}
        menuItmClick={highestClick}
        lIcn={true}
        lIcnClr="red"
        lIcnSrc="Flag"
        pTitleSrc="Highest"
      />
      <MenuItem
        menuItmClick={highClick}
        tSelected={highOn}
        lIcn={true}
        lIcnClr="orange"
        lIcnSrc="Flag"
        pTitleSrc="High"
      />
      <MenuItem
        menuItmClick={mediumClick}
        tSelected={mediumOn}
        lIcn={true}
        lIcnClr="yellow-600"
        lIcnSrc="Flag"
        pTitleSrc="Medium"
      />
      <MenuItem
        menuItmClick={lowClick}
        tSelected={lowOn}
        lIcn={true}
        lIcnClr="green"
        lIcnSrc="Flag"
        pTitleSrc="Low"
      />
      <MenuItem
        menuItmClick={lowestClick}
        tSelected={lowestOn}
        lIcn={true}
        lIcnClr="blue"
        lIcnSrc="Flag"
        pTitleSrc="Lowest"
      />
      <MenuItem
        tSelected={noneOn}
        menuItmClick={noneClick}
        lIcn={true}
        lIcnClr="n500"
        lIcnSrc="flag"
        pTitleSrc="None"
        pItmDiv=""
        tItmDiv=""
      />
      <Spacer size="16" />
    </_Component>
  );
}
