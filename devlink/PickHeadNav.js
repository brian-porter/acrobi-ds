"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import * as _utils from "./utils";
import _styles from "./PickHeadNav.module.css";

export function PickHeadNav({
  as: _Component = _Builtin.Block,
  pickNav = true,
  navIcnSrc = "nav_left",
  navClick = {},
}) {
  return pickNav ? (
    <_Component
      className={_utils.cx(_styles, "picknav")}
      tag="div"
      {...navClick}
    >
      <Icon icnSrc={navIcnSrc} />
    </_Component>
  ) : null;
}
