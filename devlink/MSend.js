"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { Img } from "./Img";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MSend.module.css";

export function MSend({
  as: _Component = _Builtin.Block,
  send = true,
  secTitleSrc = "Email Friends",
  cancelClick = {},
  toFldBtn = true,
  toFldBtnClick = {},
  subjFld = true,
  qrMap,
  exampleQr = true,
  fromTxtSrc = "{FName LName}",
  sendClick = {},
}) {
  return send ? (
    <_Component className={_utils.cx(_styles, "g-email-sms")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          titleSrc={secTitleSrc}
          act1Click={cancelClick}
          sz="xl"
          act1TxtSrc="Cancel"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="wf-form-Form"
            data-name="Form"
            method="get"
            id="wf-form-Form"
          >
            <TextfieldForm
              fieldFldBtn={toFldBtn}
              fieldFldBtnClick={toFldBtnClick}
              lblTopLblSrc="To"
              fldHelp={false}
              fieldFldBtnIcnSrc="contacts"
              fieldFldName="to"
              fieldFldId="to"
              lblTopLblFor="to"
              fieldTabOrder="0"
            />
            <TextfieldForm
              fld={subjFld}
              fieldFldBtn={false}
              lblTopLblSrc="Subject"
              fldHelp={false}
              lblTopLblFor="subject"
              fieldFldId="subject"
              fieldFldName="subject"
              fieldTabOrder="0"
            />
            <TextareaForm
              fldHelp={false}
              lblTop={false}
              lblTopLblFor="body"
              fieldFldId="body"
              fieldFldName="body"
              fieldTabOrder="0"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "qr-invite")}
              id={_utils.cx(
                _styles,
                "w-node-faaee3e8-9f5f-ccc3-f298-9c121b5b8f21-1b5b8f10"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "qr-code")}
                tag="div"
              >
                {qrMap ?? (
                  <Img
                    img={exampleQr}
                    imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65b015749b9cf0a402a56cfe_qr-invite-code.avif"
                  />
                )}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "invite-headline-wrap")}
                tag="div"
                hl-size="xs"
                obj-align="l"
                obj-loc=""
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "headline")}
                  tag="div"
                  fs="h2"
                >
                  {"Camera Scan to Accept"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "invite-from")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "subtxt")}
                    tag="div"
                    lc="2"
                  >
                    {"Invitation from "}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "subtxt")}
                    tag="div"
                    lc="2"
                  >
                    {fromTxtSrc}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <ButtonPanel
          btn1Click={sendClick}
          btn2={false}
          btn3={false}
          btn1TxtSrc="Send"
          btnPnlOri="hr"
          btn1Icn={true}
          btn1IcnSrc="Send"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
