"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./EmptyCollection.module.css";

export function EmptyCollection({
  as: _Component = _Builtin.Block,
  empty = false,
  secBtn = false,
  tirBtn = false,
  btmDoc = true,
  icnSrc = "default",
  headlineSrc = "Headline Here",
  subtxtSrc = "Descriptive call to action that can use up to two lines of copy in mobile format, around this much is good.",
  secBtnTxtSrc = "Secondary CTA",
  tirBtnTxtSrc = "Label",
  primeBtnTxtSrc = "Primary CTA",
  primeBtnStyl = "pf",
  secBtnClick = {},
  tirBtnClick = {},
  primeBtnClick = {},
}) {
  return empty ? (
    <_Component
      className={_utils.cx(_styles, "g-collection-empty")}
      tag="div"
      id="Share-Empty"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "g-message-wrap")}
        tag="div"
      >
        <HeroStack
          subtxtSrc={subtxtSrc}
          icnSrc={icnSrc}
          headlineSrc={headlineSrc}
          img={false}
          icn={true}
        />
        <ButtonPanel
          btn1TxtSrc={secBtnTxtSrc}
          btn1={secBtn}
          btn1Click={secBtnClick}
          btn2={tirBtn}
          btn2TxtSrc={tirBtnTxtSrc}
          btn2Click={tirBtnClick}
          btn3={false}
          btn1Styl="ft"
          btn2Styl="ft"
        />
        <Spacer szDep="48" size="48" />
        {btmDoc ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "doc2-bottom")}
            tag="div"
          >
            <ButtonPanel
              btn1TxtSrc={primeBtnTxtSrc}
              btn1Styl={primeBtnStyl}
              btn1Click={primeBtnClick}
              btn3={false}
              btn2={false}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sheet-footer")}
              tag="div"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
