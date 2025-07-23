"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Snackbar } from "./Snackbar";
import { TextfieldForm } from "./TextfieldForm";
import { CboxCtrl } from "./CboxCtrl";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MPasswordEdit.module.css";

export function MPasswordEdit({
  as: _Component = _Builtin.Block,
  changePass = true,
  closeClick = {},
  currentChange,
  newChange,
  confChange,
  forceChange,
  doClick = {},
  currentFbk = false,
  currentFbkTxtSrc = "Feedback here",
  currentFldBrdClr,
  newFbk = false,
  newFbkTxtSrc = "Feedback here",
  newFldBrdClr,
  confFbk = false,
  confFbkTxtSrc = "Feedback here",
  confFldBrdClr,
  forceFbk = false,
  forceFbkTxtSrc = "Feedback message",
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  passFldBtnIcnSrc = "view_pass",
  nPassFldBtnIcnSrc = "view_pass",
  cPassFldBtnIcnSrc = "view_pass",
  passFldBtnClick = {},
  nPassFldBtnClick = {},
  cPassFldBtnClick = {},
}) {
  return changePass ? (
    <_Component className={_utils.cx(_styles, "p-acc-pass")} tag="div">
      <SecHead
        act1Click={closeClick}
        sz="xl"
        titleSrc="Change Password"
        titleSz="h4"
      />
      <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbStyle={sbStyle} sbBtn={false} />
      <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="wf-form-Change-Password"
            data-name="Change Password"
            method="get"
            id="wf-form-Change-Password"
          >
            <TextfieldForm
              fieldOnChange={currentChange}
              fbk={currentFbk}
              fbkFbkTxtSrc={currentFbkTxtSrc}
              fieldFldBrdClr={currentFldBrdClr}
              fieldFldBtnIcnSrc={passFldBtnIcnSrc}
              fieldFldBtnClick={passFldBtnClick}
              lblTopLblSrc="Current Password"
              fldHelp={false}
              fieldFldBtn={true}
            />
            <TextfieldForm
              fieldOnChange={newChange}
              fbk={newFbk}
              fbkFbkTxtSrc={newFbkTxtSrc}
              fieldFldBrdClr={newFldBrdClr}
              fieldFldBtnIcnSrc={nPassFldBtnIcnSrc}
              fieldFldBtnClick={nPassFldBtnClick}
              lblTopLblSrc="New Password"
              fldHelpHelpLSrc="min. of 8 upper, lower and special characters"
              fieldFldBtn={true}
            />
            <TextfieldForm
              fieldOnChange={confChange}
              fbk={confFbk}
              fbkFbkTxtSrc={confFbkTxtSrc}
              fieldFldBrdClr={confFldBrdClr}
              fieldFldBtnIcnSrc={cPassFldBtnIcnSrc}
              fieldFldBtnClick={cPassFldBtnClick}
              lblTopLblSrc="Confirm Password"
              fldHelp={false}
              fieldFldBtn={true}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "side-spacer")}
              tag="div"
            >
              <CboxCtrl
                onChange={forceChange}
                fbk={forceFbk}
                fbkFbkTxtSrc={forceFbkTxtSrc}
                itmName="force"
                itmValue="force"
                itmLblSrc="Force alldevices to sign in again"
                lblFor="force"
                id="force"
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
        </_Builtin.FormWrapper>
        <Spacer szDep="24" size="24" />
        <ButtonPanel
          btn1Click={doClick}
          btn2={false}
          btn3={false}
          btn1TxtSrc="Done"
          btnPnlOri="hr"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
