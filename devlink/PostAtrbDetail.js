"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { LicLead } from "./LicLead";
import { LicPrime } from "./LicPrime";
import { LicTrail } from "./LicTrail";
import * as _utils from "./utils";
import _styles from "./PostAtrbDetail.module.css";

export function PostAtrbDetail({
  as: _Component = _Builtin.Block,
  atrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbName = "FName LName",
  atrbNameClr = "in",
  atrbRank = true,
  atrbRankSrc = "Rank",
  atrbRankClr = "n500",
  atrbClick = {},
  atrbAct = false,
  atrbActMoreClr = "in",
  atrbActMoreClick = {},
  atrbActTime = "1d",
  atrbActTimeClr = "in",
}) {
  return (
    <_Component className={_utils.cx(_styles, "listitem")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "lic-primary-wrap")}
        tag="div"
        {...atrbClick}
      >
        <LicLead
          avtrSrc={atrbAvtr}
          avtrAlt={atrbAvtrAlt}
          icn={false}
          icnSrc="default"
          img={false}
          adptIcn={false}
        />
        <LicPrime
          titleSrc={atrbName}
          subtxtSrc={atrbRankSrc}
          subtxt={atrbRank}
          subtxtClr={atrbRankClr}
          titleClr={atrbNameClr}
          rate={false}
          titleSubtxt={true}
          primeDiv="n"
          msg={false}
          atrb={false}
        />
      </_Builtin.Block>
      <LicTrail
        actLbl2TxtSrc={atrbActTime}
        trailClick={atrbActMoreClick}
        icnClr={atrbActMoreClr}
        actLbl2Clr={atrbActTimeClr}
        act={atrbAct}
        actLbl1IcnSrc="Moreh"
        trailDiv="n"
      />
    </_Component>
  );
}
