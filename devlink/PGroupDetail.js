"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { ListItmContent } from "./ListItmContent";
import { StatsBar } from "./StatsBar";
import { BarSs } from "./BarSs";
import { SecPeep } from "./SecPeep";
import * as _utils from "./utils";
import _styles from "./PGroupDetail.module.css";

export function PGroupDetail({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroTitle = "GroupName",
  heroSubtxt = "Subhead description below",
  heroQrClick = {},
  heroMoreClick = {},
  heroBtn = true,
  heroBtnTxtSrc = "Join",
  heroBtnIcnSrc = "Addcirc",
  heroBtnClick = {},
  scanQrBtnClick = {},
  inviteClick = {},
  roomAdd = true,
  roomAddClick = {},
  roomMap,
  roomMsgQty = "{XXX} messages",
  roomLikeQty = "{X} likes",
  roomPeepQty = "{XX} peeps",
  galAdd = true,
  galAddClick = {},
  galMap,
  galPhotoQty = "{XXX} photos",
  galVidQty = "{X} videos",
  galPeepQty = "{XX} peeps",
  attAdd = true,
  attAddClick = {},
  attListMap,
  attPlaceMap,
  mbrAdd = true,
  mbrAddClick = {},
  mbrAdminMap,
  mbrAvtrMap,
  mbrFamQty = "{X} family",
  mbrFriQty = "{X} friends",
  mbrAllQty = "{X} overall",
  exampleList = true,
  examplePlaces = true,
  exampleGallery = true,
  exampleMbrs = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "bqg-pad")} tag="div">
      <_Builtin.Layout
        className={_utils.cx(_styles, "bqg-qs-group-det")}
        id={_utils.cx(
          _styles,
          "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d63773-a3d63772"
        )}
      >
        <_Builtin.Cell
          className={_utils.cx(_styles, "ps-hero")}
          id={_utils.cx(
            _styles,
            "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d63774-a3d63772"
          )}
        >
          <_Builtin.Section
            className={_utils.cx(_styles, "bqg-qs-group-hero")}
            grid={{
              type: "section",
            }}
            tag="section"
          >
            <Hero
              imgSrc={heroImgSrc}
              btnBtnTxtSrc={heroBtnTxtSrc}
              btnBtnIcnSrc={heroBtnIcnSrc}
              btnBtnClick={heroBtnClick}
              btn={heroBtn}
              icnBarIcnBarL1Click={heroQrClick}
              icnBarIcnBarR1Click={heroMoreClick}
              hlineHlineSrc={heroTitle}
              hlineHlineSubtxtSrc={heroSubtxt}
              hlineHlineSubtxt={true}
              btnBtnTxt={true}
              icnBarIcnBarR1Src="Moreh"
              icnBar={true}
              hlineHlineLoc="btm"
              fadeBtm={false}
              avtrAvtrHline={true}
              heroAsp="21-9"
              avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
              avtrAvtrHlineSrc="FName LName"
              avtrAvtrSubTxtSrc="@handle"
              icnBarIcnBarL1Src="Qr"
            />
          </_Builtin.Section>
        </_Builtin.Cell>
        <_Builtin.Cell
          className={_utils.cx(_styles, "ps-act")}
          id={_utils.cx(
            _styles,
            "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d6377e-a3d63772"
          )}
        >
          <_Builtin.Section
            className={_utils.cx(_styles, "act-sec")}
            tag="section"
            grid={{
              type: "section",
            }}
          >
            <ItmSecCta
              desc="Give the community your honest opinion on your experience with this product, to help others with their evaluations."
              header="Reviews"
              eyebrowSrc="share your experiences"
              btnTxtSrc="Give"
              btnIcnSrc="Star_plus"
              btnClick={{}}
            />
            <InputWBtns
              lLBtnClick={scanQrBtnClick}
              fldFldTBtn={false}
              tTBtn={false}
            />
            <BtnBarSs
              btn1Click={inviteClick}
              btn1TxtSrc="Invite"
              btn2TxtSrc="Message"
              btn3TxtSrc="Honor"
              btn4TxtSrc="Alerts"
              btn3IcnSrc="rank_lvl2"
              btn3Id="honor"
              btn2IcnSrc="chat"
              btn2Id="add-to"
              btn1Id="peep_add"
              btn4Id="alert"
              btn4IcnSrc="alarm"
              btn1IcnSrc="peep_add"
              btn5={false}
              btn8TxtSrc="Settings"
              btn8IcnSrc="setting"
              btn8Id="settings"
              btn2Click={{}}
              btn3Click={{}}
              btn4Click={{}}
              btn3Dis="true"
              btn4={false}
              btn3={false}
              btn2={false}
            />
          </_Builtin.Section>
        </_Builtin.Cell>
      </_Builtin.Layout>
      <_Builtin.Layout
        className={_utils.cx(_styles, "bqg-qs-group-con")}
        id={_utils.cx(
          _styles,
          "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d63794-a3d63772"
        )}
      >
        <_Builtin.Cell
          id={_utils.cx(
            _styles,
            "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d63795-a3d63772"
          )}
        >
          <_Builtin.Section
            className={_utils.cx(_styles, "room-sec")}
            tag="section"
            grid={{
              type: "section",
            }}
          >
            <SecHead
              act1Click={roomAddClick}
              act1={roomAdd}
              titleSrc="Rooms"
              act1TxtSrc="Add"
              subtxt={false}
              sz="m"
              titleIcn={true}
              titleIcnSrc="room"
              act1Txt={false}
              act1Icn={true}
              act1IcnSrc="Add"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sec-wrap")}
              tag="div"
              shadow="y"
            >
              <Spacer szDep="16" size="16" />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                {roomMap ?? (
                  <>
                    <ListItmContent
                      lIcnL={true}
                      lAvtr={false}
                      lAdptIcn={false}
                      lIcnSrc="default"
                      pTitleSrc="{RoomName}"
                      tBtn={false}
                      tSuprAct={false}
                      tTRdio={false}
                      tTogl={false}
                      listItm={true}
                      lIcnSz="s"
                      lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                      lImgAlt="__wf_reserved_inherit"
                      lImgSz="l"
                      lAvtrSz="m"
                      lAdptIcnSrc="Default"
                      lAdptSz="m"
                      lAdptBgClr="n500"
                      lLDiv=""
                      pTitleSubtxt={true}
                      pTitleSz="r2"
                      pTitleClr="n900"
                      pSubtxt1={true}
                      pSubtxt2={false}
                      pSubtxt1Src="description of the room here"
                      pSubtxt2Src="Subtext2"
                      pSubtxt1Sz="r3"
                      pSubtxt2Sz="r3"
                      pSubtxt1Clr="n700"
                      pSubtxt2Clr="n700"
                      pPDiv="y"
                      tActLbl1Txt={true}
                      tTIcnSrc="Moreh"
                      tActLbl1TxtSrc="{#missed}"
                      tActLbl2={false}
                      tActLbl1Icn={false}
                    />
                    <ListItmContent
                      lIcnL={true}
                      lAvtr={false}
                      lAdptIcn={false}
                      lIcnSrc="default"
                      pTitleSrc="{RoomName}"
                      tBtn={false}
                      tSuprAct={false}
                      tTRdio={false}
                      tTogl={false}
                      listItm={true}
                      lIcnSz="s"
                      lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                      lImgAlt="__wf_reserved_inherit"
                      lImgSz="l"
                      lAvtrSz="m"
                      lAdptIcnSrc="Default"
                      lAdptSz="m"
                      lAdptBgClr="n500"
                      lLDiv=""
                      pTitleSubtxt={true}
                      pTitleSz="r2"
                      pTitleClr="n900"
                      pSubtxt1={true}
                      pSubtxt2={false}
                      pSubtxt1Src="description of the room here"
                      pSubtxt2Src="Subtext2"
                      pSubtxt1Sz="r3"
                      pSubtxt2Sz="r3"
                      pSubtxt1Clr="n700"
                      pSubtxt2Clr="n700"
                      pPDiv="y"
                      tActLbl1Txt={true}
                      tTIcnSrc="Moreh"
                      tActLbl1TxtSrc="{#missed}"
                      tActLbl2={false}
                      tActLbl1Icn={false}
                    />
                    <ListItmContent
                      lIcnL={true}
                      lAvtr={false}
                      lAdptIcn={false}
                      lIcnSrc="default"
                      pTitleSrc="{RoomName}"
                      tBtn={false}
                      tSuprAct={false}
                      tTRdio={false}
                      tTogl={false}
                      listItm={true}
                      lIcnSz="s"
                      lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                      lImgAlt="__wf_reserved_inherit"
                      lImgSz="l"
                      lAvtrSz="m"
                      lAdptIcnSrc="Default"
                      lAdptSz="m"
                      lAdptBgClr="n500"
                      lLDiv=""
                      pTitleSubtxt={true}
                      pTitleSz="r2"
                      pTitleClr="n900"
                      pSubtxt1={true}
                      pSubtxt2={false}
                      pSubtxt1Src="description of the room here"
                      pSubtxt2Src="Subtext2"
                      pSubtxt1Sz="r3"
                      pSubtxt2Sz="r3"
                      pSubtxt1Clr="n700"
                      pSubtxt2Clr="n700"
                      pPDiv="y"
                      tActLbl1Txt={true}
                      tTIcnSrc="Moreh"
                      tActLbl1TxtSrc="{#missed}"
                      tActLbl2={false}
                      tActLbl1Icn={false}
                    />
                  </>
                )}
              </_Builtin.List>
              <StatsBar
                stat1Src={roomMsgQty}
                stat2Src={roomLikeQty}
                stat3Src={roomPeepQty}
                stat2={true}
                stat3={true}
                stat4={false}
              />
              <Spacer szDep="16" size="16" />
            </_Builtin.Block>
            <Spacer szDep="16" size="16" />
          </_Builtin.Section>
          <_Builtin.Section
            className={_utils.cx(_styles, "media-sec")}
            tag="section"
            grid={{
              type: "section",
            }}
          >
            <SecHead
              act1Click={galAddClick}
              act1={galAdd}
              titleSrc="Media Gallery"
              act1TxtSrc="Add"
              sz="m"
              titleIcn={true}
              titleIcnSrc="gal"
              act1IcnSrc="Add"
              act1Icn={true}
              act1Txt={false}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sec-wrap")}
              tag="div"
              shadow="y"
            >
              <Spacer szDep="16" size="16" />
              <BarSs barMap={galMap} />
              <StatsBar
                stat1Src={galPhotoQty}
                stat2Src={galVidQty}
                stat3Src={galPeepQty}
                stat2={true}
                stat3={true}
                stat4={false}
              />
            </_Builtin.Block>
          </_Builtin.Section>
        </_Builtin.Cell>
        <_Builtin.Cell
          id={_utils.cx(
            _styles,
            "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d637f6-a3d63772"
          )}
        >
          <_Builtin.Section
            className={_utils.cx(_styles, "atch-sec")}
            tag="section"
            grid={{
              type: "section",
            }}
          >
            <SecHead
              act1Click={attAddClick}
              act1={attAdd}
              titleSrc="Attachments"
              act1TxtSrc="Add"
              sz="m"
              titleIcn={true}
              titleIcnSrc="attach"
              act1IcnSrc="Add"
              act1Icn={true}
              act1Txt={false}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sec-wrap")}
              tag="div"
              shadow="y"
            >
              <_Builtin.Block tag="div">
                <SecHead
                  titleSrc="Lists"
                  sz="s"
                  act1TxtSrc="Enable All"
                  act1={false}
                  titleClr="n500"
                />
                <BarSs barMap={attListMap} />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <SecHead
                  titleSrc="Places"
                  sz="s"
                  act1TxtSrc="Edit"
                  act1={false}
                  titleClr="n500"
                />
                <BarSs barMap={attPlaceMap} />
              </_Builtin.Block>
              <StatsBar
                stat1Src="stat1"
                stat2={true}
                stat3={true}
                stat4={false}
              />
            </_Builtin.Block>
          </_Builtin.Section>
        </_Builtin.Cell>
        <_Builtin.Cell
          id={_utils.cx(
            _styles,
            "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d63836-a3d63772"
          )}
        >
          <_Builtin.Section
            className={_utils.cx(_styles, "memb-sec")}
            tag="section"
            grid={{
              type: "section",
            }}
          >
            <SecHead
              act1Click={mbrAddClick}
              act1={mbrAdd}
              titleSrc="Members"
              act1TxtSrc="Add"
              sz="m"
              titleIcn={true}
              titleIcnSrc="connect"
              act1IcnSrc="Add"
              act1Icn={true}
              act1Txt={false}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sec-wrap")}
              tag="div"
              shadow="y"
            >
              <_Builtin.Block tag="div">
                <_Builtin.List
                  className={_utils.cx(_styles, "list_wrap")}
                  tag="ul"
                  unstyled={true}
                >
                  {mbrAdminMap ?? (
                    <ListItmContent
                      lIcnL={false}
                      lImg={false}
                      lAvtr={true}
                      lAdptIcn={false}
                      lIcnSrc="default"
                      pTitleSrc="{AdminName}"
                      tBtn={false}
                      tSuprAct={false}
                      tTRdio={false}
                      tTogl={false}
                      listItm={true}
                      lIcnClr="p500"
                      lIcnSz="s"
                      lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                      lImgAlt="__wf_reserved_inherit"
                      lImgSz="l"
                      lAvtrSz="l"
                      lAdptIcnSrc="Default"
                      lAdptSz="m"
                      lAdptBgClr="n500"
                      lLDiv=""
                      pTitleSubtxt={true}
                      pTitleSz="r2"
                      pTitleClr="n900"
                      pSubtxt1={true}
                      pSubtxt2={false}
                      pSubtxt1Src="@handle"
                      pSubtxt2Src="Subtext2"
                      pSubtxt1Sz="r3"
                      pSubtxt2Sz="r3"
                      pSubtxt1Clr="n700"
                      pSubtxt2Clr="n700"
                      pPDiv="y"
                      tActLbl1Txt={true}
                      tTIcnSrc="Moreh"
                      tActLbl1Icn={false}
                      tActLbl1TxtSrc="est {year}"
                      tActLbl2TxtSrc="pts {point-amt}"
                    />
                  )}
                </_Builtin.List>
                <SecPeep
                  conCellMap={mbrAvtrMap}
                  stat1Src={mbrFamQty}
                  stat2Src={mbrFriQty}
                  stat3Src={mbrAllQty}
                  secHead={false}
                  conSideFade={false}
                  exampleTitleSrc=""
                  exampleBtn={false}
                  exampleCaptSubtxt={false}
                  stat3={true}
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Section>
        </_Builtin.Cell>
        <_Builtin.Cell
          id={_utils.cx(
            _styles,
            "w-node-_03ef0c59-4647-ae24-69a5-8d50a3d63869-a3d63772"
          )}
        />
      </_Builtin.Layout>
    </_Component>
  );
}
