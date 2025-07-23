"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./GmGrant.module.css";

export function GmGrant({
  as: _Component = _Builtin.Block,
  img = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  title = "Grant Name",
  dscrpt = "Two lines of descriptive information about this device grant given by the user for application use",
  allowBtnTxt = "Allow",
  declineBtnTxt = "Not Now",

  allowBtnLink = {
    href: "#",
  },

  declineBtnLink = {
    href: "#",
  },

  allowClick = {},
  declineClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "m-grant-geo")} tag="div">
      <HeroStack headlineSrc={title} subtxtSrc={dscrpt} imgSrc={img} />
      <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
        <Spacer szDep="64" />
        <ButtonPanel
          btn1TxtSrc={allowBtnTxt}
          btn2TxtSrc={declineBtnTxt}
          btn1Click={allowClick}
          btn2Click={declineClick}
          btn3={false}
        />
      </_Builtin.Block>
    </_Component>
  );
}
