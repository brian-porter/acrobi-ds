"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Spacer } from "./Spacer";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./ItmSecCta.module.css";

export function ItmSecCta({
  as: _Component = _Builtin.Block,
  eyebrow = true,
  eyebrowSrc = "three to four words",
  header = "Comparison",
  desc = "See how this item stacks up against its competitors with these evaluations of similar items.",
  link = false,
  linkSrc = "Full Profile",
  linkClick = {},
  btnTxtSrc = "Label",
  btnIcnSrc = "default",
  btnClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "item_cta")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "item_cta-col1")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "item_cta-stack")}
          tag="div"
          {...linkClick}
        >
          {eyebrow ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "sec-cta-sub")}
              tag="div"
            >
              {eyebrowSrc}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "sec-cta-title")}
            tag="div"
          >
            {header}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sec-cta-desc")}
            tag="div"
          >
            {desc}
          </_Builtin.Block>
          {link ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "sec-cta-link")}
              tag="div"
            >
              {linkSrc}
            </_Builtin.Block>
          ) : null}
          <Spacer size="16" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "item_cta-col2")} tag="div">
        <Button
          btnTxtSrc={btnTxtSrc}
          btnIcnSrc={btnIcnSrc}
          btnClick={btnClick}
          btnSz="l"
          btnStyl="pf"
        />
      </_Builtin.Block>
    </_Component>
  );
}
