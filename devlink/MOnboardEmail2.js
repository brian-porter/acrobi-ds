"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardEmail2.module.css";

export function MOnboardEmail2({
  as: _Component = _Builtin.FormWrapper,
  signUpEmail = true,
  doBtnClick = {},
  skipBtnClick = {},
  emailFbk = false,
  emailFldBrdClr,
  emailFbkTxtSrc = "Feedback here",
  emailOnChange,
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  prevClick = {},
  prevBtn = false,
}) {
  return signUpEmail ? (
    <_Component className={_utils.cx(_styles, "onboarding")} id="sign-up-phone">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Phone"
        data-name="Sign Up Phone"
        method="get"
        id="wf-form-Sign-Up-Phone"
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
              subtxtSrc="Protect your account with your email"
              titleSrc="Secure It"
              titleShdw=""
              subTxtShdw=""
              align="c"
            />
            <TextfieldForm
              fieldFldBrdClr={emailFldBrdClr}
              fbk={emailFbk}
              fieldOnChange={emailOnChange}
              fbkFbkTxtSrc={emailFbkTxtSrc}
              lblTopLblSrc="Email"
              fldHelp={false}
              fieldFldPlaceholderSrc="jane@domain.com"
            />
            <ButtonPanel
              btn2Click={skipBtnClick}
              btn1Click={doBtnClick}
              btn3={false}
              btn2={true}
              btn1Act="next-btn"
              btn1TxtSrc="Next"
              btn2TxtSrc="Skip"
              isMultiStep=""
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664cfd40a098d795144b2253_mex-amer-shop2.avif"
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
