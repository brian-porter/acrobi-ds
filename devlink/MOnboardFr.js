"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { ButtonPanel } from "./ButtonPanel";
import { MessageAction } from "./MessageAction";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardFr.module.css";

export function MOnboardFr({
  as: _Component = _Builtin.FormWrapper,
  signUpFr = true,
  metaBtn = false,
  googleBtn = false,
  metaBtnClick = {},
  googleBtnClick = {},
  bqBtnClick = {},
  signInClick = {},
}) {
  return signUpFr ? (
    <_Component className={_utils.cx(_styles, "onboarding")} id="sign-up-fr">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-First-Run"
        data-name="Sign Up First Run"
        method="get"
        id="wf-form-Sign-Up-First-Run"
      >
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              titleShdw=""
              subTxtShdw=""
              titleSrc="BlueQueue"
              subtxtSrc="Shop | Save | Share"
              align="c"
            />
            <Spacer size="16" />
            <ButtonPanel
              btn1Click={metaBtnClick}
              btn2Click={googleBtnClick}
              btn3Click={bqBtnClick}
              btn1={metaBtn}
              btn2={googleBtn}
              btn1TxtSrc="Sign up with Facebook"
              btn1Styl="nl"
              btn2TxtSrc="Sign up with Google"
              btn3Act="next-btn"
              btn3TxtSrc="Sign Up"
              btn3Styl="pf"
            />
            <MessageAction
              msgClick={signInClick}
              msgTxtSrc="Already have an account?"
              actTxtSrc="Sign In"
              ctaTxtShad=""
              txtShad=""
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
