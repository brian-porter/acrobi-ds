"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { BbcContent } from "./BbcContent";
import * as _utils from "./utils";
import _styles from "./Bbc.module.css";

export function Bbc({
  as: _Component = _Builtin.Block,
  bbc = true,
  navMap,
  exampleContent = true,
  exampleNav = true,
}) {
  return bbc ? (
    <_Component className={_utils.cx(_styles, "bbc_canvas")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "bbc-container")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "bbc-shell")}
          tag="nav"
          data-bs="s"
        >
          {navMap ?? (
            <BbcContent pExampleNav={exampleNav} content={exampleContent} />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
