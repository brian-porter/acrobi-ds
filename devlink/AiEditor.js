"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { TextareaCtrl } from "./TextareaCtrl";
import * as _utils from "./utils";
import _styles from "./AiEditor.module.css";

export function AiEditor({
  as: _Component = _Builtin.FormWrapper,
  ai = false,
  grab = {},
  output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  rowBtnMap,
  inputChange,
  inputClick = {},
  doClick = {},
}) {
  return ai ? (
    <_Component className={_utils.cx(_styles, "ai-form")}>
      <_Builtin.FormForm
        name="wf-form-AI-Input"
        data-name="AI Input"
        method="get"
        id="wf-form-AI-Input"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ai-sheet-grab")}
          tag="div"
          {...grab}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "grab-bar")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "ai-output")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "field-out")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "fo-col")} tag="div">
              {rowBtnMap ?? (
                <>
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="1"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="2"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="3"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="4"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="5"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                </>
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fo-stage")}
              tag="div"
            >
              <_Builtin.Paragraph className={_utils.cx(_styles, "output-txt")}>
                {output}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "fo-col")} tag="div">
              {rowBtnMap ?? (
                <>
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="1"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="2"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="3"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="4"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                  <Button
                    btnStyl="nt"
                    btnTxtSrc="5"
                    btnIcn={false}
                    lblSz="r3"
                    btnSz="xs"
                  />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ai-input", "cc-btn-leadtrail")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fi-txtarea")}
            tag="div"
          >
            <TextareaCtrl
              onChange={inputChange}
              fldClick={inputClick}
              fldName="input"
              fldPholdSrc="Ask the AI"
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "fi-col")} tag="div">
            <Button
              btnTxt={false}
              btnIcnSrc="Moreh"
              btnStyl="nt"
              lblClr="n500"
              btn={false}
            />
            <Button
              btnClick={doClick}
              btnTxt={false}
              btnIcnSrc="Send"
              btnTxtSrc="Send"
              btnStyl="pf"
              btn={true}
            />
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
    </_Component>
  ) : null;
}
