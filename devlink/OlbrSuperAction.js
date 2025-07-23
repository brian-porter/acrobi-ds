"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlIcon } from "./OlIcon";
import * as _utils from "./utils";
import _styles from "./OlbrSuperAction.module.css";

export function OlbrSuperAction({
  as: _Component = _Builtin.Link,
  actIcnSrc = "addcirc",

  actLink = {
    href: "#",
  },

  actClick = {},
  bdg = false,
  bdgTxtSrc = "1",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ol_superact_wrap")}
      button={false}
      block="inline"
      options={actLink}
      {...actClick}
    >
      <OlIcon
        icnSrc={actIcnSrc}
        bdg={bdg}
        bdgTxtSrc={bdgTxtSrc}
        icnSz="m"
        icnClr="p500"
        icnDrpShdw="l"
      />
    </_Component>
  );
}
