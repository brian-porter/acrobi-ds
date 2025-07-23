"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { Headline } from "./Headline";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./HeroStack.module.css";

export function HeroStack({
  as: _Component = _Builtin.Block,
  img = true,
  icn = false,
  subtxt = true,
  backBtn = false,
  imgMap,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgSz,
  icnSrc = "default",
  headlineSrc = "Headline Here",
  subtxtSrc = "Short description goes here",
  backClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "hero-wrap")} tag="div">
      {img ? (
        <_Builtin.Block className={_utils.cx(_styles, "hero-img")} tag="div">
          {imgMap ?? (
            <_Builtin.Image
              className={_utils.cx(_styles, "image-hero-sq")}
              width="auto"
              height="auto"
              loading="lazy"
              data-obj-size={imgSz}
              alt=""
              src={imgSrc}
            />
          )}
        </_Builtin.Block>
      ) : null}
      {icn ? (
        <_Builtin.Block className={_utils.cx(_styles, "hero-icn")} tag="div">
          <Icon icnSrc={icnSrc} icnClr="p500" icnSz="2xl" />
        </_Builtin.Block>
      ) : null}
      <Headline
        titleSrc={headlineSrc}
        subtxtSrc={subtxtSrc}
        subtxt={subtxt}
        titleSz="h4"
        align="c"
        sz=""
      />
      {backBtn ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "hero-backbtn")}
          tag="div"
          data-form="back-btn"
        >
          <Button
            btnClick={backClick}
            btnStyl="nt"
            btnTxtSrc="Back"
            btnTxt={false}
            btnIcnSrc="nav_left"
            btnSz="l"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
