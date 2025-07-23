"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { HeroStack } from "./HeroStack";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MQrShow.module.css";

export function MQrShow({
  as: _Component = _Builtin.Block,
  qrShow = true,
  cancelClick = {},
  qrMap,
  exampleQr = true,
}) {
  return qrShow ? (
    <_Component className={_utils.cx(_styles, "g-invt-qr")} tag="div">
      <SecHead
        act1Click={cancelClick}
        titleSrc="Invite Friends"
        sz="xl"
        act1TxtSrc="Cancel"
        titleSz="h4"
      />
      <Spacer szDep="48" size="48" />
      <HeroStack
        img={exampleQr}
        imgMap={qrMap}
        headlineSrc="Scan to Connect"
        subtxtSrc="Use your camera to scan and add"
        imgSz="3xl"
        imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65b015732f23f6d0c4acb2d4_qr-peep-code.avif"
      />
      <Spacer szDep="48" size="48" />
      <ButtonPanel
        btn1Styl="nl"
        btnPnlOri="h"
        btn1TxtSrc="Email"
        btn1Icn={true}
        btn2Icn={true}
        btn3Icn={true}
        btn1IcnSrc="email"
        btn2TxtSrc="SMS"
        btn2IcnSrc="chat"
        btn3TxtSrc="Scan"
        btn3IcnSrc="qr_scan"
        btnPnl={false}
      />
    </_Component>
  ) : null;
}
