"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Snackbar } from "./Snackbar";
import { Button } from "./Button";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MAuthRecover.module.css";

export function MAuthRecover({
  as: _Component = _Builtin.FormWrapper,
  recover = true,
  emailOnChange,
  emailFbk = false,
  emailFldBrdClr,
  emailFbkTxtSrc = "Feedback here",
  findBtnClick = {},
  backBtnClick = {},
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
}) {
  return recover ? (
    <_Component className={_utils.cx(_styles, "onboarding")} id="recover">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-In-Recover"
        data-name="Sign In Recover"
        method="get"
        id="wf-form-Sign-In-Recover"
      >
        <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbBtn={false} />
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              titleSrc="Find Your Account"
              subtxtSrc="Enter your info and we'll send you an email with a validation code"
              titleShdw="fg"
              subTxtShdw="fg"
              titleH="h3"
              align="c"
            />
            <Spacer szDep="8" size="8" />
            <TextfieldForm
              fieldOnChange={emailOnChange}
              fbk={emailFbk}
              fieldFldBrdClr={emailFldBrdClr}
              fbkFbkTxtSrc={emailFbkTxtSrc}
              lblTopLblSrc="Email, phone or handle"
              fldHelp={false}
              fieldFldPlaceholderSrc="identify yourself"
              lblTopLblShdw="fg"
            />
            <ButtonPanel
              btn1Click={findBtnClick}
              btn3={false}
              btn2={false}
              btn1TxtSrc="Find It"
              btn1Styl="pf"
              btn1Act="next-btn"
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6618992c117b94e956a5a0a0_woman-on-phone.avif"
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
