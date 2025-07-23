"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { ButtonPanel } from "./ButtonPanel";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardConnect.module.css";

export function MOnboardConnect({
  as: _Component = _Builtin.FormWrapper,
  phoneContBtnClick = {},
  metaBtnClick = {},
  signUpContacts = true,
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  prevClick = {},
  phoneContBtn = false,
  metaBtn = true,
  googleBtn = true,
  googleBtnClick = {},
  facebookBtnStyl = "pf",
  googleBtnStyl = "pl",
  prevBtn = false,
  laterBtnClick = {},
}) {
  return signUpContacts ? (
    <_Component
      className={_utils.cx(_styles, "onboarding")}
      id="sign-up-contacts"
    >
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Contacts"
        data-name="Sign Up Contacts"
        method="get"
        id="wf-form-Sign-Up-Contacts"
      >
        {prevBtn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dialog_prev-btn")}
            tag="div"
          >
            <Button
              btnClick={prevClick}
              btnStyl="nt"
              btnTxt={false}
              btnTxtSrc="Back"
              btnSz="l"
              btnIcnSrc="nav_left_f"
              lblClr="n500"
            />
          </_Builtin.Block>
        ) : null}
        <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbBtn={false} />
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              subtxtSrc="Add friends & family from social sites"
              titleSrc="Easily Connect"
              titleShdw=""
              subTxtShdw=""
              align="c"
            />
            <Spacer szDep="8" size="8" />
            <ButtonPanel
              btn1Click={phoneContBtnClick}
              btn2Click={metaBtnClick}
              btn1={phoneContBtn}
              btn2Styl={facebookBtnStyl}
              btn3Styl={googleBtnStyl}
              btn2={metaBtn}
              btn3={googleBtn}
              btn3Click={googleBtnClick}
              btn1TxtSrc="Add From Contacts"
              btn2TxtSrc="Facebook Friends"
              btn3TxtSrc="Google Friends"
              btn2Id=""
              btn3Icn={true}
              btn2Icn={true}
              btn1Icn={true}
              btn2IcnSrc="logo_facebook"
              btn3IcnSrc="logo_google"
              btn1IcnSrc="contacts"
            />
            <ButtonPanel
              btn1Click={laterBtnClick}
              btn1TxtSrc="I'll Do It Later"
              isMultiStep=""
              btn1={true}
              btn1Styl="nl"
              btn2={false}
              btn3={false}
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "dialog-hero")} tag="div">
          <Hero
            hline={false}
            icnBar={true}
            heroAsp="9-16"
            icnBarIcnBarR1Icn={false}
            icnBarIcnBarL1Icn={false}
            icnBarIcnBarR1Src="nav_right_f"
            icnBarIcnBarL1Click={{}}
            icnBarIcnBarR1Click={{}}
            fadeBtm={false}
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664cfb91794fe4dc08b46272_mex-amer-shop.avif"
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
    </_Component>
  ) : null;
}
