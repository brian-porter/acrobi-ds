"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Rating } from "./Rating";
import { PostAtrbItem } from "./PostAtrbItem";
import * as _utils from "./utils";
import _styles from "./LicPrime.module.css";

export function LicPrime({
  as: _Component = _Builtin.Block,
  titleSubtxt = false,
  msg = true,
  rate = false,
  atrb = false,
  titleSrc = "ItemTitle",
  titleSz = "r2",
  titleClr = "in",
  titleLc = "1",
  subtxt = true,
  subtxtSrc = "Subtext",
  subtxtSz = "r3",
  subtxtClr = "n700",
  subtxtLc = "1",
  subtxt2 = false,
  subtxt2Src = "Subtext",
  subtxt2Sz = "r3",
  subtxt2Clr = "n700",
  subtxt2Lc = "1",
  msgName = "FName LName",
  msgTime = "xx",
  msgBody = "Message body copy goes here and will wrap at the end of the line for as mny times as it needs to display the contents of the message.",
  msgNameSz = "r3b",
  msgNameCl = "n900",
  msgTimeSz = "r3",
  msgTimeCl = "n700",
  msgBodySz = "r3",
  msgBodyCl = "n700",
  rateValue = "3.5",
  primeDiv = "y",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "li-primary")}
      tag="div"
      data-div={primeDiv}
    >
      {titleSubtxt ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-prime-titlesubtxt")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "li-prime-title")}
            tag="div"
            data-fs={titleSz}
            data-clr={titleClr}
            data-lc={titleLc}
          >
            {titleSrc}
          </_Builtin.Block>
          {subtxt ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "li-prime-subtxt")}
              tag="div"
              data-fs={subtxtSz}
              data-clr={subtxtClr}
              data-lc={subtxtLc}
            >
              {subtxtSrc}
            </_Builtin.Block>
          ) : null}
          {subtxt2 ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "li-prime-subtxt")}
              tag="div"
              data-fs={subtxt2Sz}
              data-clr={subtxt2Clr}
              data-lc={subtxt2Lc}
            >
              {subtxt2Src}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {msg ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-prime-msg")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "lic-prime-name")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "li-prime-name")}
              tag="div"
              data-fs={msgNameSz}
              data-clr={msgNameCl}
              data-lc="1"
            >
              {msgName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "li-prime-time")}
              tag="div"
              data-fs={msgTimeSz}
              data-clr={msgTimeCl}
              data-lc="1"
            >
              {msgTime}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "li-prime-msg")}
            tag="div"
            data-fs={msgBodySz}
            data-clr={msgBodyCl}
          >
            {msgBody}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {rate ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "lic-prime-rating")}
          tag="div"
        >
          <Rating qtySrc={rateValue} />
        </_Builtin.Block>
      ) : null}
      <PostAtrbItem
        atrb={atrb}
        atrbClick={{}}
        atrbAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        atrbAvtrAlt="__wf_reserved_inherit"
        atrbNameSrc="GroupName"
        atrbBdg={true}
        atrbBdg1Icn={true}
        atrbBdg1TxtSrc="156"
        atrbBdg1IcnSrc="members"
        atrbBdg2IcnSrc="member"
        atrbAvtr2={true}
        atrbName={false}
        atrbAvtr3={false}
        atrbAvtr4={false}
        atrbAvtr5={false}
        atrbAvtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        atrbAvtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        atrbAvtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        atrbAvtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
        atrbAvtr2Alt="__wf_reserved_inherit"
        atrbAvtr3Alt="__wf_reserved_inherit"
        atrbAvtr4Alt="__wf_reserved_inherit"
        atrbAvtr5Alt="__wf_reserved_inherit"
      />
    </_Component>
  );
}
