"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { HeroStack } from "./HeroStack";
import { Spacer } from "./Spacer";
import { Paragraph } from "./Paragraph";
import { ButtonPanel } from "./ButtonPanel";
import { Cell } from "./Cell";
import { Button } from "./Button";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MShake.module.css";

export function MShake({
  as: _Component = _Builtin.Block,
  shake = true,
  shakeAllow = true,
  shakeAllowCancelClick = {},
  shakeAllowClick = {},
  shakeReady = false,
  shakeReadyCancelClick = {},
  shakeReadyAddClick = {},
  shakeReadyFindClick = {},
  shaking = false,
  shakingCancelClick = {},
  shakingClick = {},
  shakeResult = false,
  shakeResultCancelClick = {},
  shakeResultRedoClick = {},
  groupMap,
}) {
  return shake ? (
    <_Component className={_utils.cx(_styles, "g-shake")} tag="div">
      {shakeAllow ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "g-shakeallow")}
          tag="div"
        >
          <SecHead
            act1Click={shakeAllowCancelClick}
            titleSrc="Invite Friends"
            sz="xl"
            act1TxtSrc="Cancel"
            titleSz="h4"
          />
          <_Builtin.Block className={_utils.cx(_styles, "hero-wrap")} tag="div">
            <HeroStack
              headlineSrc="Join in a Shake"
              subtxtSrc="Add large groups of people in the same location with just a few shakes of the phone"
              imgSz="3xl"
              icn={true}
              img={false}
              icnSrc="geo_mobile"
            />
            <Spacer szDep="64" size="64" />
            <Paragraph
              align="c"
              bodySrc="To participate in group activities you will need to allow location tracking, so we know which group you're in."
            />
            <ButtonPanel
              btn1Click={shakeAllowClick}
              btn1TxtSrc="Allow"
              btn3={false}
              btn2={false}
            />
            <Spacer szDep="64" size="64" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {shakeReady ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "g-shakeready")}
          tag="div"
        >
          <SecHead
            act1Click={shakeReadyCancelClick}
            titleSrc="Invite Friends"
            sz="xl"
            act1TxtSrc="Cancel"
            titleSz="h4"
          />
          <_Builtin.Block className={_utils.cx(_styles, "hero-wrap")} tag="div">
            <HeroStack
              headlineSrc="Ready to Join"
              subtxtSrc="Groups in your area are waiting for you to shake and join them"
              imgSz="3xl"
              icn={true}
              img={false}
              icnSrc="geo_myloc"
            />
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={shakeReadyAddClick}
              btn2Click={shakeReadyFindClick}
              btn1TxtSrc="Create a Group"
              btn3={false}
              btn2Styl="pf"
              btn1Styl="nl"
              btn2TxtSrc="Find Groups By Me"
            />
            <Spacer szDep="64" size="64" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {shaking ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "g-shaking")}
          tag="div"
          {...shakingClick}
        >
          <SecHead
            act1Click={shakingCancelClick}
            titleSrc="Invite Friends"
            sz="xl"
            act1TxtSrc="Cancel"
            titleSz="h4"
          />
          <_Builtin.Block className={_utils.cx(_styles, "hero-wrap")} tag="div">
            <HeroStack
              headlineSrc="Everyone Shake!"
              subtxtSrc="Shake your phone or tap the screen to find and join groups at your location"
              imgSz="3xl"
              icn={true}
              img={false}
              icnSrc="phone_vibrate"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {shakeResult ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "g-shakeresult")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
            <SecHead
              act1Click={shakeResultCancelClick}
              act2Click={shakeResultRedoClick}
              titleSrc="Groups"
              sz="xl"
              act1TxtSrc="Cancel"
              titleSz="h4"
              act2={true}
              act2IcnSrc="refresh"
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
            <_Builtin.Grid className={_utils.cx(_styles, "grid-12")} tag="div">
              {groupMap ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "cell-grp")}
                  tag="div"
                  cell-sz="fill"
                >
                  <Cell
                    imgImgBnrTxtSrc="ListName"
                    imgImgBnrFull={true}
                    captionCapStk={true}
                    caption={true}
                    capStkRowsAlign="l"
                    capStkRow1Src="GroupName"
                    imgImgBnrFullTxtSrc="123"
                    imgImgBnrFullIcnSrc="Member"
                    cell={true}
                  />
                  <Button
                    btnTxtSrc="Join"
                    btnStyl="pl"
                    btn={true}
                    btnIcnSrc="addcircle"
                    btnClick={{}}
                  />
                </_Builtin.Block>
              )}
            </_Builtin.Grid>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "a-footer")}
            tag="div"
            top-shadow="y"
          >
            <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Btop-shadow%3D%22y%22%5D.a-footer%20%7B%0A%09border-top%3A%201px%20solid%3B%0A%20%20color%3Argba(var(--n300)%2C%201)%3B%0A%20%20box-shadow%3A%200px%20-10px%2010px%200px%20rgba(var(--n200)%2C%201)%3B%0A%7D%0A%3C%2Fstyle%3E" />
            <InputWBtns
              tTBtn={true}
              fldFldLIcnSrc="Search"
              tTBtnIcnSrc="filter"
              tTBtnPad="n"
              lLBtnClick={{}}
              tTBtnClick={{}}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
