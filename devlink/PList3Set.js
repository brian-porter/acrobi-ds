"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { BarSs } from "./BarSs";
import { Spacer } from "./Spacer";
import { ListItmContent } from "./ListItmContent";
import { CboxCtrl } from "./CboxCtrl";
import * as _utils from "./utils";
import _styles from "./PList3Set.module.css";

export function PList3Set({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "Settings",
  heroSubtxtSrc = "{ListName}",
  heroEditBtn = true,
  heroEditBtnClick = {},
  lsTitleSrc = "{ListName}",
  lsSubtxtSrc = "{ListSubCat - ListType}",
  lsNameClick = {},
  privConfClick = {},
  privPrivateClick = {},
  privPubClick = {},
  privBroadClick = {},
  privConfActive = "true",
  privPrivateActive = "false",
  privPubActive = "false",
  privBroadActive = "false",
  mbrAddClick = {},
  mbrExample = true,
  mbrMap,
  mbrAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  mbrTxtSrc = "FName LI",
  mbrType = true,
  mbrTypeIcnSrc = "Admin",
  mbrTypeIcnClr = "yellow-700",
  mbrId,
  mbrClick = {},
  ctrlDateSubtxtSrc = "{date - time}",
  ctrlDateClick = {},
  ctrlAlertSubtxtSrc = "{date - time, location}",
  ctrlAlertClick = {},
  ctrlPriorSubtxtSrc = "{priorityLevel}",
  ctrlPriorClick = {},
  ctrlDlvrSubtxtSrc = "{PlaceName}",
  ctrlDlvrClick = {},
  mngDefChange,
  mngTmpltChange,
  mngTmpltTxtSrc = "Save as a {ListCategory} template",
  lsAllTxtSrc = "All",
  lsAllClick = {},
  lsOffer = true,
  lsBoost = true,
  lsCheck = true,
  lsInvite = true,
  lsPoll = true,
  lsHide = true,
  lsInteli = true,
  lsComp = true,
  lsOffToglClick = {},
  lsBoostToglClick = {},
  lsCheckToglClick = {},
  lsInviteToglClick = {},
  lsPollToglClick = {},
  lsHideToglClick = {},
  lsInteliToglClick = {},
  lsCompToglClick = {},
  dzTransClick = {},
  dzDeleteClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-l3")}
          id={_utils.cx(
            _styles,
            "w-node-_29cc3df1-0ea0-399b-7364-00790cd6a08a-0cd6a089"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-hero-set")}
            id={_utils.cx(
              _styles,
              "w-node-_29cc3df1-0ea0-399b-7364-00790cd6a08b-0cd6a089"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "qs-hero")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <Hero
                hlineHlineSrc={heroHlineSrc}
                btn={heroEditBtn}
                hlineHlineSubtxtSrc={heroSubtxtSrc}
                imgSrc={heroImgSrc}
                btnBtnClick={heroEditBtnClick}
                hlineHlineLoc="btm"
                fadeBtm={false}
                heroAsp="21-9"
                hlineHlineSubtxt={true}
                icnBar={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-act-set")}
            id={_utils.cx(
              _styles,
              "w-node-_29cc3df1-0ea0-399b-7364-00790cd6a090-0cd6a089"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "qs-act")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1={false}
                titleSrc="Access"
                sz="l"
                subtxt={true}
                subtxtSrc="The who, what & where"
                titleSz="r1"
                titleClr="n700"
              />
              <ListItmCtrl
                pPTitleSrc={lsTitleSrc}
                pPSubtxtSrc={lsSubtxtSrc}
                listItemClick={lsNameClick}
                lLIcn={true}
                lLIcnSrc="binders"
                lLIcnClr="n700"
                tTIcn={true}
                tTIcnSrc="nav_right"
              />
              <SecHead
                act1={false}
                titleSrc="Privacy"
                sz="s"
                titleIcn={true}
                titleIcnSrc="lock_key"
              />
              <BarSs barMap={mbrMap} slotId="priv" />
              <SecHead
                act1Click={mbrAddClick}
                act1={true}
                titleSrc="List Members"
                sz="s"
                titleIcn={true}
                titleIcnSrc="member"
                act1TxtSrc="Edit"
                act2={false}
                act2IcnSrc=""
                act1Icn={false}
                act1Txt={true}
                act1IcnSrc="Peep_add"
              />
              <BarSs barMap={mbrMap} slotId="mbr" />
              <Spacer size="16" />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-stk")}
            id={_utils.cx(
              _styles,
              "w-node-_29cc3df1-0ea0-399b-7364-00790cd6a0ab-0cd6a089"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "sec-container")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1={false}
                titleSrc="Controls"
                sz="l"
                subtxt={true}
                subtxtSrc="The dates & places"
                titleSz="r1"
                titleClr="n700"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                <ListItmContent
                  pSubtxt1Src={ctrlDateSubtxtSrc}
                  listItmClick={ctrlDateClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="cal"
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
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  pTitleSrc="Date"
                  tTIcn={true}
                />
                <ListItmContent
                  pSubtxt1Src={ctrlAlertSubtxtSrc}
                  listItmClick={ctrlAlertClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="alarm"
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
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  pTitleSrc="Notifications"
                  tTIcn={true}
                />
                <ListItmContent
                  pSubtxt1Src={ctrlPriorSubtxtSrc}
                  listItmClick={ctrlPriorClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="flag"
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
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  pTitleSrc="Priority"
                  tTIcn={true}
                />
                <ListItmContent
                  pSubtxt1Src={ctrlDlvrSubtxtSrc}
                  listItmClick={ctrlDlvrClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="geo_home"
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
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  pTitleSrc="Deliver To"
                  tTIcn={true}
                />
              </_Builtin.List>
            </_Builtin.Section>
            <_Builtin.Section
              className={_utils.cx(_styles, "sec-container")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1={false}
                titleSrc="Manage"
                sz="l"
                subtxt={true}
                subtxtSrc="Personal preferences"
                titleSz="r1"
                titleClr="n700"
              />
              <_Builtin.FormWrapper>
                <_Builtin.FormForm
                  name="wf-form-Account-Settings"
                  data-name="Account Settings"
                  method="get"
                  id="wf-form-Account-Settings"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "side-spacer")}
                    tag="div"
                  >
                    <CboxCtrl
                      onChange={mngDefChange}
                      itmLblSrc="Mark as default list"
                      txt={true}
                      linkSrc={{
                        href: "#",
                      }}
                      linkTxtSrc="Link here"
                      link={false}
                      fbk={false}
                      fbkFbkTxt={true}
                      fbkFbkIcn={true}
                      fbkFbkTxtSrc="Feedback message"
                      fbkFbkIcnSrc="clearcirc"
                      fbkFbkClr="fd500"
                      tabOrder=""
                      itmLblSz="r3"
                      itmName="default-list"
                      itmValue="default"
                      linkClick={{}}
                      itmActive="False"
                      lblShdw=""
                      linkShdw=""
                      lblFor="default-list"
                      fbkFbkIcnLoc="r"
                      id="default-list"
                    />
                    <CboxCtrl
                      itmLblSrc={mngTmpltTxtSrc}
                      onChange={mngTmpltChange}
                      txt={true}
                      linkSrc={{
                        href: "#",
                      }}
                      linkTxtSrc="Link here"
                      link={false}
                      fbk={false}
                      fbkFbkTxt={true}
                      fbkFbkIcn={true}
                      fbkFbkTxtSrc="Feedback message"
                      fbkFbkIcnSrc="clearcirc"
                      fbkFbkClr="fd500"
                      tabOrder=""
                      itmLblSz="r3"
                      itmName="template"
                      itmValue="template"
                      linkClick={{}}
                      itmActive="False"
                      lblShdw=""
                      linkShdw=""
                      lblFor="template"
                      fbkFbkIcnLoc="r"
                      id="template"
                    />
                  </_Builtin.Block>
                </_Builtin.FormForm>
                <_Builtin.FormSuccessMessage>
                  <_Builtin.Block tag="div">
                    {"Thank you! Your submission has been received!"}
                  </_Builtin.Block>
                </_Builtin.FormSuccessMessage>
                <_Builtin.FormErrorMessage>
                  <_Builtin.Block tag="div">
                    {"Oops! Something went wrong while submitting the form."}
                  </_Builtin.Block>
                </_Builtin.FormErrorMessage>
              </_Builtin.FormWrapper>
              <Spacer szDep="8" size="8" />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-stk")}
            id={_utils.cx(
              _styles,
              "w-node-_29cc3df1-0ea0-399b-7364-00790cd6a0dd-0cd6a089"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "sec-container-grow")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1TxtSrc={lsAllTxtSrc}
                act1Click={lsAllClick}
                titleSrc="Properties"
                act1={true}
                sz="l"
                subtxt={true}
                subtxtSrc="The list capabilities"
                titleClr="n700"
                titleSz="r1"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                <ListItmContent
                  listItm={lsOffer}
                  tToglClick={lsOffToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  lIcnSrc="offer"
                  pTitleSrc="I'm open to basket and item offers"
                  tToglValue="offer"
                />
                <ListItmContent
                  listItm={lsBoost}
                  tToglClick={lsBoostToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  pTitleSrc="Boost offers to earn Qoin"
                  lIcnSrc="coins"
                  tToglValue="boost"
                />
                <ListItmContent
                  listItm={lsCheck}
                  tToglClick={lsCheckToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  lIcnSrc="todo"
                  pTitleSrc="Make this a checklist of items"
                  tToglValue="check"
                />
                <ListItmContent
                  listItm={lsInvite}
                  tToglClick={lsInviteToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  lIcnSrc="people"
                  pTitleSrc="List members can invite others"
                  tToglValue="invite"
                />
                <ListItmContent
                  listItm={lsPoll}
                  tToglClick={lsPollToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  lIcnSrc="poll"
                  pTitleSrc="List members can create polls"
                  tToglValue="poll"
                />
                <ListItmContent
                  listItm={lsHide}
                  tToglClick={lsHideToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  lIcnSrc="detective"
                  pTitleSrc="Hide buy and chat from list owner"
                  tToglValue="hide"
                />
                <ListItmContent
                  listItm={lsInteli}
                  tToglClick={lsInteliToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  lIcnSrc="inteli"
                  pTitleSrc="InteliSelect based on past choices"
                  tToglValue="inteli"
                />
                <ListItmContent
                  listItm={lsComp}
                  tToglClick={lsCompToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  tTogl={true}
                  lIcnClr="p500"
                  lIcnSz="s"
                  lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  lImgAlt="__wf_reserved_inherit"
                  lImgSz="l"
                  lAvtrSz="m"
                  lAdptIcnSrc="Default"
                  lAdptSz="m"
                  lAdptBgClr="n500"
                  lLDiv=""
                  pTitleSz="r2"
                  pTitleClr="n900"
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  lIcnSrc="complimentary"
                  pTitleSrc="Suggest complimentary items"
                  tToglValue="comp"
                />
              </_Builtin.List>
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-stk")}
            id={_utils.cx(
              _styles,
              "w-node-_29cc3df1-0ea0-399b-7364-00790cd6a104-0cd6a089"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "sec-container")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1={false}
                titleSrc="Danger Zone"
                sz="l"
                titleSz="r1"
                titleClr="n700"
              />
              <Spacer size="16" />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                <ListItmContent
                  listItmClick={dzTransClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="assign"
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
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  pTitleSrc="Transfer List Ownership"
                  pSubtxt1Src="Assign ownership of this list to someone else"
                  tTIcn={true}
                />
                <ListItmContent
                  listItmClick={dzDeleteClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="delete"
                  tBtn={false}
                  tSuprAct={false}
                  tTRdio={false}
                  tTogl={false}
                  listItm={true}
                  lIcnClr="fd500"
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
                  pSubtxt2Src="Subtext2"
                  pSubtxt1Sz="r3"
                  pSubtxt2Sz="r3"
                  pSubtxt1Clr="n700"
                  pSubtxt2Clr="n700"
                  pPDiv="y"
                  tActLbl1Txt={false}
                  tTIcnSrc="nav_right"
                  pTitleSrc="Delete List"
                  pSubtxt1Src="This will remove this list and all of its contents"
                  tTIcn={true}
                />
              </_Builtin.List>
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_29cc3df1-0ea0-399b-7364-00790cd6a117-0cd6a089"
            )}
          >
            <Spacer size="8" />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
