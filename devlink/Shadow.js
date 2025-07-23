"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Size } from "./Size";
import * as _utils from "./utils";
import _styles from "./Shadow.module.css";

export function Shadow({
  as: _Component = _Builtin.Block,
  source = "Default",
  size = "none",
  shadow = "none",
}) {
  const _styleVariantMap = {
    none: "",
    xs: "w-variant-94a7755d-3b97-b01a-7d5f-525969586123",
    s: "w-variant-86dce184-bf08-99ee-cea2-df3561b4cca9",
    m: "w-variant-d8d65c7f-47b2-6036-613b-0b07739e8fb3",
    l: "w-variant-729c33b2-e431-f006-fc96-b3509fcb4c04",
    xl: "w-variant-5ee5bed1-3611-233d-7d06-a4d645bc832d",
  };

  const _activeStyleVariant = _styleVariantMap[shadow];
  return (
    <_Component
      className={_utils.cx(_styles, "ts-none", _activeStyleVariant)}
      tag="div"
    >
      <Size source={source} size={size} />
    </_Component>
  );
}
