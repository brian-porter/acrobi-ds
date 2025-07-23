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
import _styles from "./MOnboardHandle.module.css";

export function MOnboardHandle({
  as: _Component = _Builtin.FormWrapper,
  signUpHandle = true,
  doBtnClick = {},
  handleFbk = false,
  handleFldBrdClr,
  handleFbkTxtSrc = "Taken",
  handleFbkIcnSrc = "Stop",
  handleFbkClr = "fd500",
  sb = true,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  prevClick = {},
  handleOnChange,
  prevBtn = false,
}) {
  return signUpHandle ? (
    <_Component
      className={_utils.cx(_styles, "onboarding")}
      id="sign-up-handle"
    >
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Handle"
        data-name="Sign Up Handle"
        method="get"
        id="wf-form-Sign-Up-Handle"
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
        <Snackbar
          sb={sb}
          sbTxtSrc={sbTxtSrc}
          sbBtn={false}
          sbStyle="error"
          sbIcn={true}
          sbIcnSrc="Warn"
        />
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              subtxtSrc="Your handle is unique to you and how others know, interact, and find you"
              titleSrc="Uniquely Yours"
              titleShdw=""
              subTxtShdw=""
              align="c"
            />
            <TextfieldForm
              fbk={handleFbk}
              fieldFldBrdClr={handleFldBrdClr}
              fbkFbkTxtSrc={handleFbkTxtSrc}
              fieldOnChange={handleOnChange}
              fbkFbkIcnSrc={handleFbkIcnSrc}
              fbkFbkClr={handleFbkClr}
              lblTopLblSrc="Handle"
              fieldTabOrder="1"
              fldHelpHelpLSrc="Choose wisely, this can't be changed"
              fieldFldPlaceholderSrc="@handle"
              fbkFbkIcn={true}
            />
            <ButtonPanel
              btn1Click={doBtnClick}
              btn3={false}
              btn1Act="next-btn"
              btn1TxtSrc="Grab It"
              btn2={false}
              isMultiStep=""
            />
            <Spacer szDep="16" size="16" />
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664d01ca23feb877d9554d1d_india-amer-woman-wall.avif"
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
