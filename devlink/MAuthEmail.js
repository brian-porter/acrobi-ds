"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { CboxCtrl } from "./CboxCtrl";
import { ButtonPanel } from "./ButtonPanel";
import { MessageAction } from "./MessageAction";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MAuthEmail.module.css";

export function MAuthEmail({
  as: _Component = _Builtin.FormWrapper,
  signUpEmail = true,
  emailOnChange,
  passOnChange,
  toSOnChange,

  toSLinkSrc = {
    href: "#tos",
  },

  toSLinkClick = {},
  doBtnClick = {},
  signInClick = {},
  emailFbk = false,
  emailFldBrdClr,
  emailFbkTxtSrc = "Feedback here",
  emailFldType = "email",
  passFbk = false,
  passFldBrdClr,
  passFbkTxtSrc = "Feedback here",
  passFldType,
  passFldBtnIcnSrc = "view_pass",
  fldBtnClick = {},
  doBtnDisabled = "false",
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  toSChecked = "False",
  toSChange,
}) {
  return signUpEmail ? (
    <_Component className={_utils.cx(_styles, "onboarding")} id="sign-up">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-3"
        data-name="Sign Up"
        method="get"
        id="wf-form-Sign-Up-3"
      >
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbBtn={false} />
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              subtxtSrc="Get started by linking your email"
              titleSrc="Sign Up"
              subTxtShdw="fg"
              titleShdw="fg"
              align="c"
            />
            <TextfieldForm
              fieldOnChange={emailOnChange}
              fbk={emailFbk}
              fieldFldBrdClr={emailFldBrdClr}
              fbkFbkTxtSrc={emailFbkTxtSrc}
              lblTopLblSrc="Email or Phone"
              fldHelp={false}
              fieldTabOrder="0"
              fieldFldPlaceholderSrc="jane@domain.com"
              lblTopLblShdw="fg"
              lblTopLblFor="username"
              fieldFldName="username"
              fieldFldId="unsername"
            />
            <TextfieldForm
              fieldOnChange={passOnChange}
              fbk={passFbk}
              fieldFldBrdClr={passFldBrdClr}
              fbkFbkTxtSrc={passFbkTxtSrc}
              fieldFldBtnClick={fldBtnClick}
              fieldFldBtnIcnSrc={passFldBtnIcnSrc}
              fieldFldType={passFldType}
              lblTopLblSrc="Password"
              fldHelpHelpLSrc="8 characters of numbers, symbols, upper & lower case"
              fieldTabOrder="0"
              fieldFldPlaceholderSrc="At least 8 characters"
              fieldFldBtn={true}
              fbkFbkIcn={false}
              fbkFbkIcnSrc=""
              lblTopLblShdw="fg"
              fldHelpHelpShdw="fg"
              fieldFldId="password"
              fieldFldName="password"
              lblTopLblFor="password"
              fldHelp={true}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "side-spacer")}
              tag="div"
            >
              <CboxCtrl
                onChange={toSChange}
                linkClick={toSLinkClick}
                itmLblSrc="I agree to the"
                txt={true}
                linkSrc={{
                  href: "#",
                }}
                linkTxtSrc="BlueQueue terms"
                link={true}
                fbk={false}
                fbkFbkTxt={true}
                fbkFbkIcn={true}
                fbkFbkTxtSrc="Feedback message"
                fbkFbkIcnSrc="clearcirc"
                fbkFbkClr="fd500"
                tabOrder=""
                itmLblSz="r3"
                itmName="tos"
                itmValue="agree"
                itmActive="False"
                lblShdw=""
                linkShdw=""
                lblFor="tos"
                fbkFbkIcnLoc="r"
                id="tos"
              />
            </_Builtin.Block>
            <ButtonPanel
              btn1Click={doBtnClick}
              btn1Disabled={doBtnDisabled}
              btn3={false}
              btn2={false}
              btn1Act="next-btn"
              btn1TxtSrc="Create Account"
            />
            <MessageAction
              msgClick={signInClick}
              msgTxtSrc="Already have an account?"
              actTxtSrc="Sign In"
              txtShad="fg"
              ctaTxtShad="fg"
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664cfb904f4279cb7b6214ba_afric-amer-shop.avif"
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
