"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Shadow } from "./Shadow";
import * as _utils from "./utils";
import _styles from "./Icn.module.css";

export function Icn({
  as: _Component = _Builtin.Block,
  on = true,
  source = "Default",
  styleSize = "n900",
  styleColor = "n900",
  styleShadow = "n900",
}) {
  const _styleVariantMap = {
    n999: "w-variant-b9d390ca-a2cd-4d4c-1e11-ae4ad63b1549",
    n900: "",
    n700: "w-variant-ec1a848b-4d42-dfa2-ee21-4831f937e639",
    n500: "w-variant-33d4a433-20eb-ee7e-0c10-2f823975970f",
    n300: "w-variant-9fc4d096-81f3-4aff-33d9-594a25c2845d",
    n200: "w-variant-61a742e1-fd84-bf50-6de5-b841542d356b",
    n100: "w-variant-6d718643-b055-f8d0-2266-bdab04265d9e",
    n000: "w-variant-a0064b05-b61a-6839-c6d7-7f086560e9c7",
    p500: "w-variant-e27388c6-a8a1-1ac8-9e28-028c142e517e",
  };

  const _activeStyleVariant = _styleVariantMap[styleColor];

  return on ? (
    <_Component
      className={_utils.cx(_styles, "", "clr", _activeStyleVariant)}
      id={_utils.cx(
        _styles,
        "w-node-_3100a2ae-7a4c-4b6c-2a03-4c5cc582179b-c582179b"
      )}
      tag="div"
    >
      <Shadow size={styleSize} shadow={styleShadow} source={source} />
    </_Component>
  ) : null;
}
