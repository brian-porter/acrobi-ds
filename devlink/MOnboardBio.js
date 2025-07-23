"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { ButtonPanel } from "./ButtonPanel";
import { Paragraph } from "./Paragraph";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardBio.module.css";

export function MOnboardBio({
  as: _Component = _Builtin.FormWrapper,
  doBtnClick = {},
  skipBtnClick = {},
  signUpBio = true,
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  prevClick = {},
  prevBtn = false,
}) {
  return signUpBio ? (
    <_Component className={_utils.cx(_styles, "onboarding")} id="sign-up-bio">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Bio"
        data-name="Sign Up Bio"
        method="get"
        id="wf-form-Sign-Up-Bio"
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
        <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbStyle={sbStyle} sbBtn={false} />
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              subtxtSrc="Enable passkeys and biometrics to sign into the app. Trust us, it's incredibly convenient."
              titleSrc="Easy to Unlock"
              titleShdw=""
              subTxtShdw=""
              align="c"
            />
            <Spacer szDep="8" size="8" />
            <ButtonPanel
              btn1Click={doBtnClick}
              btn2Click={skipBtnClick}
              btn3={false}
              btn2={true}
              btn1Act="next-btn"
              btn1TxtSrc="Set Up Passkeys"
              btn2TxtSrc="I'll Sign In Manually"
              isMultiStep=""
            />
            <Spacer szDep="8" size="8" />
            <Paragraph
              align="c"
              fontSz="r3"
              bodySrc="Passkey sign in is the best way to secure your account, all without remembering a password."
              fontClr="n700"
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664cfeb3bbc02070d2eaeb7c_mideast-amer-doorway.avif"
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
