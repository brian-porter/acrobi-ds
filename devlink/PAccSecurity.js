"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { TextfieldForm } from "./TextfieldForm";
import { TextfieldLinkForm } from "./TextfieldLinkForm";
import { SwitchForm } from "./SwitchForm";
import { ButtonPanel } from "./ButtonPanel";
import { ListItmCtrl } from "./ListItmCtrl";
import * as _utils from "./utils";
import _styles from "./PAccSecurity.module.css";

export function PAccSecurity({
  as: _Component = _Builtin.Block,
  passwordClick = {},
  bioToglClick = {},
  bioToglRowClick = {},
  doClick = {},
  deleteClick = {},
  fnameOnChange,
  lnameOnChange,
  phoneOnChange,
  emailOnChange,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-_2849a60d-a981-1f23-bdd2-c591b8e042f3-21a5be75"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_2849a60d-a981-1f23-bdd2-c591b8e042f4-21a5be75"
            )}
          >
            <SecHead
              titleSrc="Sign In & Security"
              sz="xl"
              titleSz="h4b"
              act1={false}
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_2849a60d-a981-1f23-bdd2-c591b8e042f8-21a5be75"
            )}
          >
            <_Builtin.FormWrapper
              className={_utils.cx(_styles, "acc-sec", "u-mb-3")}
            >
              <_Builtin.FormForm
                name="email-form"
                data-name="Email Form"
                method="get"
                id="email-form"
              >
                <TextfieldForm
                  fieldOnChange={phoneOnChange}
                  lblTopLblSrc="Phone"
                  fldHelpHelpLSrc="to verify and regain access"
                  fieldFldId="phone"
                  lblTopLblFor="phone"
                  fieldFldName="phone"
                  fieldFldPlaceholderSrc="this field is required"
                />
                <TextfieldForm
                  fieldOnChange={emailOnChange}
                  lblTopLblSrc="Email Address"
                  fldHelpHelpLSrc="in case of sign-in trouble"
                  fieldFldId="email"
                  lblTopLblFor="email"
                  fieldFldName="email"
                  fieldFldPlaceholderSrc="this field is required"
                />
                <TextfieldLinkForm
                  fldClick={passwordClick}
                  lblSrc="Password"
                  helpLSrc="to protect your account"
                />
                <SwitchForm
                  lblTop={false}
                  fieldTglLableSrc="Unlock & sign in with biometrics"
                />
                <ButtonPanel
                  btn1Click={doClick}
                  btn1TxtSrc="Done"
                  btnPnlOri="hr"
                  btn2={false}
                  btn3={false}
                />
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
            <_Builtin.Block
              className={_utils.cx(_styles, "acc-delete-contain")}
              tag="div"
            >
              <ListItmCtrl
                listItemClick={deleteClick}
                lLIcn={true}
                pPSubtxt={false}
                pPTitleSz="r4"
                pPTitleSrc="Delete Account"
                lLIcnSrc="peep_remove"
                lLIcnClr="fd500"
                trailDiv=""
                primeDiv=""
              />
            </_Builtin.Block>
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
