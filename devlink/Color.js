"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Shadow } from "./Shadow";
import * as _utils from "./utils";
import _styles from "./Color.module.css";

export function Color({
  as: _Component = _Builtin.Block,
  on = true,
  source = "Default",
  styleSize = "n900",
  styleColor = "n900",
  styleShadow = "n900",
}) {
  const _styleVariantMap = {
    n999: "w-variant-c9c2e302-32d1-dd6d-2304-3145d60601c8",
    n900: "",
    n700: "w-variant-479a75e0-f6df-7c0e-3893-3e1b9080a017",
    n500: "w-variant-ce73cb56-38a2-54e6-93b8-bf0deb619c27",
    n300: "w-variant-2d3f4547-e884-b3d8-77dd-7689df9b9af1",
    n200: "w-variant-d6cbd28c-8e43-efaf-ac64-cb27f5d0cc8d",
    n100: "w-variant-6c889b4f-fcb8-0dd1-dd8d-112b8817e42f",
    n000: "w-variant-fac596a9-3f9c-7a48-b58e-f53b22569dde",
    p500: "w-variant-99db2f21-9e81-4013-0946-32a25b63aa3c",
    f500: "w-variant-ae11d569-6aad-6af4-6940-918d63a380a6",
    fs500: "w-variant-73de1b70-4db7-065c-da23-4482ea45c6c5",
    fw500: "w-variant-4cd95c80-55ba-53f5-c906-4903f7d2d1dc",
    fd500: "w-variant-9e185e21-180b-a6cb-b738-e962de715a0d",
  };

  const _activeStyleVariant = _styleVariantMap[styleColor];

  return on ? (
    <_Component
      className={_utils.cx(_styles, "", "clr", _activeStyleVariant)}
      id={_utils.cx(
        _styles,
        "w-node-_3cea5575-5b0f-4014-6844-c2cd1db1591f-1db1591f"
      )}
      tag="div"
    >
      <Shadow size={styleSize} shadow={styleShadow} source={source} />
    </_Component>
  ) : null;
}
