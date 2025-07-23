"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { Message } from "./Message";
import { TextareaForm } from "./TextareaForm";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MReportOn.module.css";

export function MReportOn({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  type = "{Report Type}",
  disc = "{Discription}",
  bullets = (
    <>
      {"- ReportType bullets here"}
      <br />
      {"- ReportType bullets here"}
      <br />
      {"- ReportType bullets here"}
      <br />
      {"- ReportType bullets here"}
    </>
  ),
  noteChange,
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-report-on")}
      tag="section"
      id="Report-on"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          sz="xl"
          titleSrc="Reporting on"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <ListItmCtrl pPTitleSrc={type} pPSubtxtSrc={disc} />
        <Message
          bodySrc={bullets}
          titleSrc="We remove things like..."
          icnClr="fd500"
          icnSrc="Report"
        />
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-share")}>
          <_Builtin.FormForm
            name="wf-form-Reporting"
            data-name="Reporting"
            method="get"
            id="wf-form-Reporting"
          >
            <TextareaForm
              fieldOnChange={noteChange}
              fldHelpHelpR={true}
              fldHelpHelpRSrc="0/500"
              fldHelpHelpLSrc=""
              lblTopLblSrc="Anything you'd like us to know"
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
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
        <ButtonPanel
          btn1Click={doClick}
          btn3={false}
          btn2={false}
          btn1TxtSrc="Report"
          btn1Styl="df"
        />
        <Spacer />
      </_Builtin.Block>
    </_Component>
  );
}
