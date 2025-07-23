"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { LicLead } from "./LicLead";
import { LicPrime } from "./LicPrime";
import { LicTrail } from "./LicTrail";
import * as _utils from "./utils";
import _styles from "./CellPlacePrice.module.css";

export function CellPlacePrice({
  as: _Component = _Builtin.Block,
  cell = true,
  id = "place-price-grid",
  vizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  vizAlt = "__wf_reserved_inherit",
  vizSz = "xl",
  captTitleSrc = "$00.00",
  captSubtxtSrc = "SellerName",
  captSub2Src = "SellerLocation",
  cellSz = "auto",
  cellCard = "true",
  actClick = {},
  cellClick = {},
}) {
  return cell ? (
    <_Component
      className={_utils.cx(_styles, "cell-placeprice")}
      tag="div"
      data-cell-card={cellCard}
      data-cell-size={cellSz}
      id={id}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "lic-primary-wrap")}
        tag="div"
        {...cellClick}
      >
        <LicLead
          imgSrc={vizSrc}
          imgSz={vizSz}
          imgAlt={vizAlt}
          icnSrc="default"
          icn={false}
          img={true}
          adptIcn={false}
          adptIcnSrc="Default"
          avtr={false}
          icnClr="p500"
          icnSz="s"
          adptSz="m"
          adptBgClr="n500"
          avtrSz="m"
          leadDiv=""
          avtrBdg={false}
          avtrBdgClr="fd500"
          avtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
          avtrAlt="__wf_reserved_inherit"
          avtr2={false}
          avtr3={false}
          avtr4={false}
          avtr5={false}
          avtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
          avtr2Alt="__wf_reserved_inherit"
          avtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
          avtr3Alt="__wf_reserved_inherit"
          avtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
          avtr4Alt="__wf_reserved_inherit"
          avtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
          avtr5Alt="__wf_reserved_inherit"
          rdio={false}
          rdioIcn="rdio_off"
          rdioClr="n300"
          rdioSz="m"
          rdioClick={{}}
          avtrBdgSz="m"
        />
        <LicPrime
          titleSrc={captTitleSrc}
          subtxtSrc={captSubtxtSrc}
          subtxt2Src={captSub2Src}
          titleSubtxt={true}
          rate={false}
          titleSz="r1"
          subtxtSz="r3"
          subtxt={true}
          subtxt2Sz="r4"
          subtxt2={true}
          rateValue="3.5"
          titleLc="1"
          msg={false}
          msgName="FName LName"
          msgTime="xx"
          msgBody="Message body copy goes here and will wrap at the end of the line for as mny times as it needs to display the contents of the message."
          titleClr="n999"
          primeDiv="n"
        />
      </_Builtin.Block>
      <LicTrail
        trailClick={actClick}
        suprAct={true}
        icnSrc="Moreh"
        actLbl2TxtSrc="14h"
        actLbl2={true}
        togl={false}
        actLbl1IcnSrc="Moreh"
        actLbl1Clr="in"
        actLbl1Icn={true}
        actLbl1Txt={true}
        actLbl1TxtSrc="Label"
        actLbl2Clr="in"
        actLbl2Icn={false}
        actLbl2IcnSrc="default"
        actLbl2Txt={true}
        btn={false}
        actLbl1Sz="r3"
        btnTxtSrc="Button"
        btnIcn={false}
        btnTxt={true}
        btnIconSrc="default"
        btnSz="s"
        btnStyl="nl"
        btnClick={{}}
        trailDiv="n"
        icnClr=""
        toglValue=""
        toglClick={{}}
        icn={false}
        suprActExp={false}
        suprActExpClick={{}}
        suprActClick={{}}
        suprActExpTxtSrc="more"
        suprActExpIcnSrc="nav_down"
        bdg={false}
        bdgTxtSrc="3"
        bdgClr="p500"
        rdio={false}
        rdioSrc="rdio_off"
        rdioClr="n300"
        rdioClick={{}}
        icnSz="s"
        rdioSz="m"
        act={false}
      />
    </_Component>
  ) : null;
}
