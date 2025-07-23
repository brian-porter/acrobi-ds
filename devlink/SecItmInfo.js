"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { Acrd } from "./Acrd";
import * as _utils from "./utils";
import _styles from "./SecItmInfo.module.css";

export function SecItmInfo({
  as: _Component = _Builtin.Section,
  itmNameSrc = "Item name goes here with a line wrap",
  itmManufSrc = "ManufacturerName",
  acrdItmMap,
  aboutSrc = "Body copy goes here for the about section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  specsSrc = "Body copy goes here for specs section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "item_info")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block className={_utils.cx(_styles, "item-name")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "r1")} tag="div">
          {itmNameSrc}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "item-manf")} tag="div">
        <Label txtSrc={itmManufSrc} icn={false} lblSz="r1" lblClr="f500" />
      </_Builtin.Block>
      <Acrd acrdItmMap={acrdItmMap} />
    </_Component>
  );
}
