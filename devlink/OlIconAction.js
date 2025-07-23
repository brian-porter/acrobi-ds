"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import * as _utils from "./utils";
import _styles from "./OlIconAction.module.css";

export function OlIconAction({
  as: _Component = _Builtin.Link,
  icn = true,
  icnSrc = "Default",
  icnClr = "in",
  icnSz = "r1",
  icnId,
  icnClick = {},
  icnDrpShdw = "m",
}) {
  return icn ? (
    <_Component
      className={_utils.cx(_styles, "icn-act")}
      button={false}
      x-ref=""
      id={icnId}
      block="inline"
      options={{
        href: "#",
      }}
      {...icnClick}
    >
      <Icon
        icnSrc={icnSrc}
        icnClr={icnClr}
        icnDrpShdw={icnDrpShdw}
        icnSz={icnSz}
      />
    </_Component>
  ) : null;
}
