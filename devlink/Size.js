"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Size.module.css";

export function Size({
  as: _Component = _Builtin.Block,
  size = "s",
  source = "Default",
}) {
  const _styleVariantMap = {
    xxs: "w-variant-d838dd92-fb1e-55f2-eaf3-89cde4361fbd",
    xs: "w-variant-6712bb44-a3e6-a023-5f8d-aedf00d7d5c4",
    s: "",
    sm: "w-variant-a49820aa-f2cf-527c-5ee9-9e7d454151e8",
    m: "w-variant-ac25b967-fad2-15d9-b8b3-b8cf2ed85fb8",
    ml: "w-variant-a506c360-5428-5644-9bc2-fb0070bc85cb",
    l: "w-variant-70858a83-692e-574d-286a-165590eca9b3",
    xl: "w-variant-9c252a2d-932d-2c6e-6ccf-d7cbd9a7d1c5",
    xxl: "w-variant-caef1363-eb6a-81c2-aebd-27f22526a58a",
  };

  const _activeStyleVariant = _styleVariantMap[size];
  return (
    <_Component
      className={_utils.cx(_styles, "sz", _activeStyleVariant)}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "icn", _activeStyleVariant)}
        tag="div"
      >
        {"Default"}
      </_Builtin.Block>
    </_Component>
  );
}
