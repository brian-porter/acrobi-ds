"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Headline } from "./Headline";
import { Paragraph } from "./Paragraph";
import { SecHead } from "./SecHead";
import * as _utils from "./utils";
import _styles from "./DsSection.module.css";

export function DsSection({
  as: _Component = _Builtin.BlockContainer,
  visibility = true,
}) {
  return visibility ? (
    <_Component
      grid={{
        type: "container",
      }}
      tag="div"
    >
      <Headline sz="2xl" subtxt={false} />
      <Paragraph bodySrc="lorem ipsum dolor sit amet, consectetur" />
      <_Builtin.Block
        className={_utils.cx(_styles, "ds__card")}
        tag="section"
        id="Modal"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ds__card-main")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ds_doc_card-preview")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ds__card-name")}
              tag="div"
            >
              <SecHead act1={false} titleSrc="Sample" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ds__card-sample")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ds__card-detail")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ds__wrap-props")}
            tag="div"
          >
            <SecHead act1={false} titleSrc="Properties" sz="l" />
            <Paragraph bodySrc="lorem ipsum dolor sit amet, consectetur" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
