"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Avatar } from "./Avatar";
import { Img } from "./Img";
import { Label } from "./Label";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { AdaptIconGroup } from "./AdaptIconGroup";
import { AvatarGroup } from "./AvatarGroup";
import * as _utils from "./utils";
import _styles from "./CardPeepData.module.css";

export function CardPeepData({
  as: _Component = _Builtin.Block,
  card = true,
  cardId = "obj-data",
  peep = true,
  group = false,
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAlt = "__wf_reserved_inherit",
  avtrBdgClr = "on",
  titleSrc = "ProfName",

  profLink = {
    href: "#",
  },

  profClick = {},

  chatLink = {
    href: "#",
  },

  chatBtnClick = {},

  moreLink = {
    href: "#",
  },

  moreBtnClick = {},
  listQty = "0",
  lsAdpt1IcnSrc = "Default",
  lsAdpt1BgClr = "n300",
  lsAdpt2BgClr = "n500",
  lsAdpt2CnSrc = "Default",
  lsAdpt3BgClr = "n700",
  lsAdpt3IcnSrc = "Default",

  listLink = {
    href: "#",
  },

  listClick = {},
  peepQty = "0",
  peepAvtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  peepAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  peepAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",

  peepLink = {
    href: "#",
  },

  peepClick = {},
  calQty = "0",
  calAdpt1IcnSrc = "Default",
  calAdpt1BgClr = "n200",
  calAdpt2BgClr = "n300",
  calAdpt2CnSrc = "Default",
  calAdpt3BgClr = "n700",
  calAdpt3IcnSrc = "Default",

  calLink = {
    href: "#",
  },

  calClick = {},
}) {
  return card ? (
    <_Component
      className={_utils.cx(_styles, "cell-prof-act")}
      tag="div"
      data-bs="xs"
      data-corner-radius="16"
      id={cardId}
    >
      <_Builtin.Row
        className={_utils.cx(_styles, "cell-columns")}
        tag="div"
        columns={{
          main: "6|6",
          medium: "",
          small: "",
          tiny: "",
        }}
      >
        <_Builtin.Column className={_utils.cx(_styles, "profile-id")} tag="div">
          <_Builtin.Link
            className={_utils.cx(_styles, "profile-link")}
            button={false}
            block="inline"
            options={profLink}
            {...profClick}
          >
            <Avatar
              avtr={peep}
              bdgClr={avtrBdgClr}
              avtrSrc={avtrSrc}
              avtrAlt={avtrAlt}
              avtrSz="2xl"
              bdgSz="m"
              bdg={true}
            />
            <Img
              img={group}
              imgSrc={avtrSrc}
              imgAlt={avtrAlt}
              imgSz="2xl"
              imgShape="r"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "profile-caption")}
              tag="div"
            >
              <Label
                txtSrc={titleSrc}
                icn={false}
                lblSz="r3"
                icnLoc="r"
                lblClr="n900"
                lblLc="1"
              />
            </_Builtin.Block>
          </_Builtin.Link>
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-actions")}
            tag="div"
          >
            <Button
              btnClick={chatBtnClick}
              btnTxt={false}
              btnStyl="nt"
              btnSz="l"
              btnTxtSrc="Chat"
              btnIcnSrc="chat"
            />
            <Button
              btnClick={moreBtnClick}
              btnTxt={false}
              btnStyl="nt"
              btnSz="l"
              btnTxtSrc="More"
              btnIcnSrc="Moreh"
            />
          </_Builtin.Block>
        </_Builtin.Column>
        <_Builtin.Column
          className={_utils.cx(_styles, "profile-stats")}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(_styles, "prof-act-stat")}
            button={false}
            block="inline"
            options={listLink}
            {...listClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "prof-act-stat-val")}
              tag="div"
            >
              <Icon icnSz="sm" icnSrc="list" />
              <Label txtSrc={listQty} icnSrc="default" icnLoc="r" icn={false} />
            </_Builtin.Block>
            <AdaptIconGroup
              adpt1BgClr={lsAdpt1BgClr}
              adpt1IcnSrc={lsAdpt1IcnSrc}
              adpt2BgClr={lsAdpt2BgClr}
              adpt2CnSrc={lsAdpt2CnSrc}
              adpt3BgClr={lsAdpt3BgClr}
              adpt3IcnSrc={lsAdpt3IcnSrc}
              grpSz="s"
              adpt3={true}
            />
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "prof-act-stat")}
            button={false}
            block="inline"
            options={peepLink}
            {...peepClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "prof-act-stat-val")}
              tag="div"
            >
              <Icon icnSz="sm" icnSrc="connect" />
              <Label txtSrc={peepQty} icnSrc="default" icnLoc="r" icn={false} />
            </_Builtin.Block>
            <AvatarGroup
              avtr1Src={peepAvtr1Src}
              avtr2Src={peepAvtr2Src}
              avtr3Src={peepAvtr3Src}
              avtrSz="s"
              avtr3={true}
              avtr2={true}
              grpShp="r"
            />
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(_styles, "prof-act-stat")}
            button={false}
            block="inline"
            options={calLink}
            {...calClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "prof-act-stat-val")}
              tag="div"
            >
              <Icon icnSz="sm" icnSrc="cal_today" />
              <Label txtSrc={calQty} icnSrc="default" icnLoc="r" icn={false} />
            </_Builtin.Block>
            <AdaptIconGroup
              adpt1IcnSrc={calAdpt1IcnSrc}
              adpt1BgClr={calAdpt1BgClr}
              adpt2BgClr={calAdpt2BgClr}
              adpt2CnSrc={calAdpt2CnSrc}
              adpt3BgClr={calAdpt3BgClr}
              adpt3IcnSrc={calAdpt3IcnSrc}
              grpSz="s"
              adpt3={true}
              grpShp="s"
            />
          </_Builtin.Link>
        </_Builtin.Column>
      </_Builtin.Row>
    </_Component>
  ) : null;
}
