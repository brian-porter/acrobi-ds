"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { ButtonPanel } from "./ButtonPanel";
import { Paragraph } from "./Paragraph";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardSuccess.module.css";

export function MOnboardSuccess({
  as: _Component = _Builtin.FormWrapper,
  signUpSuccess = true,
  doBtnClick = {},
  skipBtnClick = {},
  prevClick = {},
  prevBtn = false,
}) {
  return signUpSuccess ? (
    <_Component
      className={_utils.cx(_styles, "onboarding")}
      id="sign-up-success"
    >
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Success"
        data-name="Sign Up Success"
        method="get"
        id="wf-form-Sign-Up-Success"
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
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              subtxtSrc="Now lets grab a handle and personalize your profile"
              titleSrc="You're In!"
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
              btn1TxtSrc="Let's Set Things Up"
              btn2TxtSrc="I'll Do It Later"
              isMultiStep=""
            />
            <Spacer szDep="8" size="8" />
            <Paragraph
              align="c"
              fontSz="r3"
              bodySrc="Glad your here! Next let's set up your profile."
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664d00cab06d0039ec76141e_amer-woman-hand-raised.avif"
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
