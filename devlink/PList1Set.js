"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { ChipsSs } from "./ChipsSs";
import { Spacer } from "./Spacer";
import { ListItmContent } from "./ListItmContent";
import * as _utils from "./utils";
import _styles from "./PList1Set.module.css";

export function PList1Set({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "List Settings",
  heroSubtxtSrc = "Subhead description below",
  heroEditBtn = true,
  heroEditBtnClick = {},
  addAsMap,
  privConfClick = {},
  privPrivateClick = {},
  privPubClick = {},
  privBroadClick = {},
  privConfActive = "true",
  privPrivateActive = "false",
  privPubActive = "false",
  privBroadActive = "false",
  filterMap,
  ordActClick = {},
  ordUsedClick = {},
  ordPopClick = {},
  ordDueClick = {},
  ordPriorityClick = {},
  ordNameClick = {},
  ordCustomClick = {},
  ordCustom = true,
  ctrlDateSubtxtSrc = "{date - time}",
  ctrlDateClick = {},
  ctrlAlertSubtxtSrc = "{date - time, location}",
  ctrlAlertClick = {},
  ctrlPriorSubtxtSrc = "{priorityLevel}",
  ctrlPriorClick = {},
  ctrlDlvrSubtxtSrc = "{PlaceName}",
  ctrlDlvrClick = {},
  propFamToglClick = {},
  propTrendToglClick = {},
  lsAllTxtSrc = "All",
  lsAllClick = {},
  lsBqToglClick = {},
  lsBrandToglClick = {},
  lsCommToglClick = {},
  lsConToglClick = {},
  lsFriendToglClick = {},
  lsFamToglClick = {},
  filter = false,
  id,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-set")}
          id={_utils.cx(
            _styles,
            "w-node-_35c6bcca-d349-0e3a-894e-7c8d24386cc2-24386cc1"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-hero-set")}
            id={_utils.cx(
              _styles,
              "w-node-_35c6bcca-d349-0e3a-894e-7c8d24386cc3-24386cc1"
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
                imgSrc={heroImgSrc}
                hlineHlineSrc={heroHlineSrc}
                hlineHlineSubtxtSrc={heroSubtxtSrc}
                btn={heroEditBtn}
                btnBtnClick={heroEditBtnClick}
                hlineHlineLoc="btm"
                fadeBtm={false}
                heroAsp="21-9"
                icnBar={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-act-set")}
            id={_utils.cx(
              _styles,
              "w-node-_35c6bcca-d349-0e3a-894e-7c8d24386cc7-24386cc1"
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
                titleSrc="List Defaults"
                act1TxtSrc="Edit"
                act1={false}
                subtxtSrc="How you'd like to use lists"
                titleSz="r1"
                titleClr="n700"
              />
              <SecHead
                act1={false}
                titleSrc="Create as"
                sz="s"
                titleIcn={true}
                titleIcnSrc="act_addcirc"
              />
              <_Builtin.FormWrapper>
                <_Builtin.FormForm
                  name="email-form"
                  data-name="Email Form"
                  method="get"
                  id="email-form"
                >
                  <BarSs barMap={addAsMap} empty={false} slotId="priv" />
                  <SecHead
                    act1={false}
                    titleSrc="Order by"
                    sz="s"
                    titleIcn={true}
                    titleIcnSrc="act_reorder"
                  />
                  <BarSs barMap={filterMap} empty={false} slotId="sort" />
                  {filter ? (
                    <_Builtin.Block tag="div">
                      <SecHead
                        act1={false}
                        titleSrc="Filter by"
                        sz="s"
                        titleIcn={true}
                        titleIcnSrc="act_filter"
                      />
                      <ChipsSs cellMap={filterMap} sideFade={false} />
                    </_Builtin.Block>
                  ) : null}
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
              <Spacer />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-stk")}
            id={_utils.cx(
              _styles,
              "w-node-_35c6bcca-d349-0e3a-894e-7c8d24386cef-24386cc1"
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
                titleSrc="Properties"
                act1={false}
                sz="l"
                titleSz="r1"
                titleClr="n700"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                <ListItmContent
                  tToglClick={propFamToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="family"
                  tTogl={true}
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
                  pTitleSrc="Show family lists at the top"
                  tToglValue="fam-top"
                />
                <ListItmContent
                  tToglClick={propTrendToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="hot"
                  tTogl={true}
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
                  pTitleSrc="Show trending lists"
                  tToglValue="trend"
                />
              </_Builtin.List>
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "qs-stk")}
            id={_utils.cx(
              _styles,
              "w-node-_50bc0d55-2bfe-d060-f511-a9b1d27bdb54-24386cc1"
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
                titleSrc="Show Lists From"
                act1={true}
                sz="l"
                titleClr="n700"
                titleSz="r1"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                <ListItmContent
                  tToglClick={lsBqToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="bq"
                  tTogl={true}
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
                  tToglValue="bq"
                  pTitleSrc="BlueQueue"
                />
                <ListItmContent
                  tToglClick={lsBrandToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="brand"
                  tTogl={true}
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
                  pTitleSrc="Brands"
                  tToglValue="brand"
                />
                <ListItmContent
                  tToglClick={lsCommToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="public"
                  tTogl={true}
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
                  tToglValue="comm"
                  pTitleSrc="Community"
                />
                <ListItmContent
                  tToglClick={lsConToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="connect"
                  tTogl={true}
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
                  pTitleSrc="Connections"
                  tToglValue="Con"
                />
                <ListItmContent
                  tToglClick={lsFriendToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="friend"
                  tTogl={true}
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
                  tToglValue="friend"
                  pTitleSrc="Friends"
                />
                <ListItmContent
                  tToglClick={lsFamToglClick}
                  lIcnL={true}
                  lImg={false}
                  lAvtr={false}
                  lAdptIcn={false}
                  lIcnSrc="family"
                  tTogl={true}
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
                  pTitleSrc="Family"
                  tToglValue="fam"
                />
              </_Builtin.List>
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
