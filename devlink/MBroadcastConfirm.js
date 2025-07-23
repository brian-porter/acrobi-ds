"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Paragraph } from "./Paragraph";
import { Message } from "./Message";
import { CboxForm } from "./CboxForm";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MBroadcastConfirm.module.css";

export function MBroadcastConfirm({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  acceptClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-brdcast-conf")}
      tag="section"
      id="Broadcast"
    >
      <SecHead
        act1Click={cancelClick}
        titleSrc="Broadcast"
        sz="xl"
        titleSz="h4"
      />
      <Paragraph
        fontSz="r2"
        bodySrc="Iunderstand that this content will be linked back to my public profile."
      />
      <Message
        bodySrc="This is a broadcast to the community, and once done, is part of the public domain and is not retractable."
        titleSrc="This content will be publicly displayed"
        icnSrc="Public"
        icnClr="f500"
      />
      <_Builtin.FormWrapper className={_utils.cx(_styles, "dock-btm")}>
        <_Builtin.FormForm
          name="email-form"
          data-name="Email Form"
          method="get"
          id="email-form"
        >
          <CboxForm />
          <ButtonPanel
            btn1Click={acceptClick}
            btn1TxtSrc="Accept"
            btn2={false}
            btn3={false}
          />
          <Spacer size="16" />
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
    </_Component>
  );
}
