"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { Button } from "./Button";
import { AvatarGroup } from "./AvatarGroup";
import { Label } from "./Label";
import { BarSs } from "./BarSs";
import { Cell } from "./Cell";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./CardGroupData.module.css";

export function CardGroupData({
  as: _Component = _Builtin.Block,
  card = true,
  cardId = "CardGroupData",
  simple = true,
  cover = false,
  avtr2 = false,
  avtr3 = false,
  avtr4 = false,
  avtr5 = false,
  avtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  cvrImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  cvrAltSrc = "__wf_reserved_inherit",
  titleSrc = "GroupName",
  profClick = {},
  chatBtnClick = {},
  moreBtnClick = {},
  exampleRoom = true,
  exampleGallery = true,
  roomMap,
  galMap,
  atchMap,
  pplMap,
  stats = true,
  stat2 = true,
  stat3 = true,
  stat4 = true,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  exampleRmIcnSrc = "default",
  exampleRmNameSrc = "RoomName",
  exampleRmClick = {},
  exampleGalImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleGalImgAlt = "__wf_reserved_inherit",
  exampleGalNameSrc = "ImageName",
  exampleGalClick = {},
}) {
  return card ? (
    <_Component
      className={_utils.cx(_styles, "cell-group-act", "card-item")}
      tag="div"
      data-bs="xs"
      id={cardId}
    >
      {cover ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "group-id-cover")}
          tag="div"
        >
          <Hero
            bnrBnrTxtSrc={titleSrc}
            bnrBnrAvtr1Src={avtr1Src}
            bnrBnrAvtr2Src={avtr2Src}
            bnrBnrAvtr3Src={avtr3Src}
            bnrBnrAvtr4Src={avtr4Src}
            bnrBnrAvtr5Src={avtr5Src}
            bnrBnrAvtr2={avtr2}
            bnrBnrAvtr3={avtr3}
            bnrBnrAvtr4={avtr4}
            bnrBnrAvtr5={avtr5}
            imgSrc={cvrImgSrc}
            icnBarIcnBarL1Click={chatBtnClick}
            icnBarIcnBarR1Click={moreBtnClick}
            heroClick={profClick}
            imgAlt={cvrAltSrc}
            hlineHlineSrc="GroupName"
            btnBtnIcnSrc="Photo"
            btnBtnTxtSrc="Add"
            btnBtnTxt={true}
            bnr={true}
            hline={false}
            fadeBtm={false}
            heroAsp="21-9"
            bnrBnrAvtr={true}
            icnBar={true}
            icnBarIcnBarL1Link={{
              href: "#",
            }}
            icnBarIcnBarR1Link={{
              href: "#",
            }}
            icnBarIcnBarR1Src="Moreh"
            icnBarIcnBarL1Src="Chat"
          />
        </_Builtin.Block>
      ) : null}
      {simple ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "group-id-simp")}
          tag="div"
          data-obj-asp="21-9"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "group-act-col")}
            tag="div"
          >
            <Button
              btnClick={chatBtnClick}
              btnTxt={false}
              btnStyl="nt"
              btnSz="l"
              btnTxtSrc="Chat"
              btnIcnSrc="chat"
              lblSz="r1"
            />
          </_Builtin.Block>
          <_Builtin.Link
            className={_utils.cx(_styles, "group-pro-link")}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
            {...profClick}
          >
            <AvatarGroup
              avtr1Src={avtr1Src}
              avtr2Src={avtr2Src}
              avtr3Src={avtr3Src}
              avtr4Src={avtr4Src}
              avtr5Src={avtr5Src}
              avtr3={avtr3}
              avtr4={avtr4}
              avtr5={avtr5}
              avtr2={avtr2}
              avtrSz="xl"
              avtr2Bdg={true}
              avtr3Bdg={true}
              avtr4Bdg={true}
              avtr5Bdg={true}
              avtr1Bdg={true}
              avtr1BdgClr="off"
              avtr2BdgClr="off"
              avtr3BdgClr="off"
              avtr4BdgClr="off"
              avtr5BdgClr="off"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "group-caption")}
              tag="div"
            >
              <Label txtSrc={titleSrc} lblSz="r1" icn={false} />
            </_Builtin.Block>
          </_Builtin.Link>
          <_Builtin.Block
            className={_utils.cx(_styles, "group-act-col")}
            tag="div"
          >
            <Button
              btnClick={moreBtnClick}
              btnTxt={false}
              btnStyl="nt"
              btnSz="l"
              btnTxtSrc="More"
              btnIcnSrc="Moreh"
              lblSz="r1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "group-detail")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "tabs-wrap")} tag="div">
          <_Builtin.TabsWrapper
            className={_utils.cx(_styles, "tabs")}
            data-duration-in="300"
            data-duration-out="100"
            tab-underline="y"
            current="rooms"
            easing="ease-in-out"
            fadeIn={300}
            fadeOut={100}
          >
            <_Builtin.TabsMenu
              className={_utils.cx(_styles, "tab-menu")}
              tag="div"
            >
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="rooms"
                block="inline"
              >
                <Label lblSz="r2" icnSrc="room" txtSrc="Rooms" />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="gallery"
                block="inline"
              >
                <Label lblSz="r2" icnSrc="gal" txtSrc="Gallery" />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="attach"
                block="inline"
              >
                <Label lblSz="r2" txtSrc="Attach" icnSrc="attach" />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="peep"
                block="inline"
              >
                <Label lblSz="r2" icnSrc="connect" txtSrc="Peep" />
              </_Builtin.TabsLink>
            </_Builtin.TabsMenu>
            <_Builtin.TabsContent
              className={_utils.cx(_styles, "tab-groupcontent")}
              tag="div"
            >
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="rooms"
                data-cell-sz="3xl"
              >
                <BarSs
                  barMap={roomMap}
                  slotId="CardGroupData-Room"
                  empty={false}
                />
                <Cell
                  capStkRow1Src={exampleRmNameSrc}
                  cell={exampleRoom}
                  icnIcnSrc={exampleRmIcnSrc}
                  cellClick={exampleRmClick}
                  vizIcn={true}
                  vizImg={false}
                  caption={true}
                  icnIcnClr="n700"
                  captionCapStk={true}
                  capStkRowsAlign="c"
                  cellSz="2xl"
                />
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="gallery"
              >
                <BarSs barMap={galMap} slotId="CardGroupData-Gal" />
                <Cell
                  capStkRow1Src={exampleGalNameSrc}
                  cell={exampleGallery}
                  cellClick={exampleGalClick}
                  imgImgSrc={exampleGalImgSrc}
                  imgImgAlt={exampleGalImgAlt}
                  vizIcn={false}
                  vizImg={true}
                  caption={true}
                  icnIcnSz="2xl"
                  icnIcnClr="n700"
                  captionCapStk={true}
                  cellSz="2xl"
                  icnIcnSrc="default"
                />
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="attach"
              >
                <BarSs barMap={atchMap} slotId="CardGroupData-Att" />
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="peep"
              >
                <BarSs barMap={pplMap} slotId="CardGroupData-Peep" />
              </_Builtin.TabsPane>
            </_Builtin.TabsContent>
          </_Builtin.TabsWrapper>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "css-tab")}
            value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.tab-bar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.tab-bar%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%0A.tab-link.w--current%20.label%20.txt%20%7B%0A%09font-weight%3A%20bold%3B%0A%7D%0A.tab-link.w--current%20.label%20.icn%3A%3Afirst-letter%20%7B%0A%20%20%20%20text-transform%3A%20uppercase%3B%0A%7D%0A%5Btab-underline%3D%22y%22%5D%0A.tab-link.w--current%20%7B%0A%20%20%20%20border-bottom-style%3A%20solid%3B%0A%20%20%20%20border-bottom-width%3A%202px%3B%0A%20%20%20%20border-bottom-color%3A%20var(--color--p500)%3B%0A%20%20%20%20color%3A%20var(--color--p500)%3B%0A%20%20%20%20font-weight%3A%20700%3B%0A%7D%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <StatsBar
        stats={stats}
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat2={stat2}
        stat3={stat3}
        stat4={stat4}
      />
    </_Component>
  ) : null;
}
