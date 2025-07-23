"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Headline } from "./Headline";
import * as _utils from "./utils";
import _styles from "./DsStyleCard.module.css";

export function DsStyleCard({
  as: _Component = _Builtin.Block,
  name = "Name",
  value = "Value",
  color = "#ff0000",
  colored = " background: #ffffff;",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ds__styles-card")}
      id={_utils.cx(
        _styles,
        "w-node-_9361ad7b-703f-ff5e-5089-778dfe6f51a4-fe6f51a4"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ds__style-color")}
        tag="div"
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "input-2")}
          tag="div"
          style={colored}
          value={colored}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ds__style-body")}
        tag="div"
      >
        <Headline titleSrc={name} subtxtSrc={value} sz="m" />
      </_Builtin.Block>
    </_Component>
  );
}
