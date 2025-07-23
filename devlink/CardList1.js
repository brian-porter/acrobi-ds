"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Img } from "./Img";
import * as _utils from "./utils";
import _styles from "./CardList1.module.css";

export function CardList1({
  as: _Component = _Builtin.Block,
  pin = false,
  bookmark = false,
  chat = false,
  event = false,
  alert = false,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgAlt,
  imgAsp = "1-1",
  bnrIcnSrc = "Default",
  bnrTxtSrc = "ListName",
  cardDrpShdw = "xs",

  cardLink = {
    href: "#",
    preload: "none",
  },

  cardClick = {},
  cardId,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "masonry-item")}
      tag="div"
      bs={cardDrpShdw}
      id={cardId}
      {...cardClick}
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "list-link")}
        button={false}
        block="inline"
        options={cardLink}
      >
        <Img
          imgSrc={imgSrc}
          imgAlt={imgAlt}
          bnrBnrTxtSrc={bnrTxtSrc}
          bnrBnrIcnSrc={bnrIcnSrc}
          icnBarIcnBarL1={pin}
          icnBarIcnBarL2={bookmark}
          icnBarIcnBarR1={chat}
          icnBarIcnBarR2={event}
          icnBarIcnBarR3={alert}
          imgAsp={imgAsp}
          imgSz="auto"
          icnBarIcnBarL1Src="Pin"
          icnBarIcnBarL2Src="Bookmark"
          icnBarIcnBarR1Src="Chat"
          icnBarIcnBarR2Src="Cal_sched"
          icnBarIcnBarR3Src="Alarm"
          bnr={true}
          icnBar={true}
          icnBarIcnBarL3Src="Default"
        />
      </_Builtin.Link>
    </_Component>
  );
}
