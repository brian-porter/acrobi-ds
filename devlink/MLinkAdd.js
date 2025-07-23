"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MLinkAdd.module.css";

export function MLinkAdd({
  as: _Component = _Builtin.Block,
  linkAdd = true,
  headTitleSrc = "Add Link",
  cancelClick = {},
  txtFld = true,
  txtFldChange,
  txtFldClick = {},
  linkFldChange,
  linkFldClick = {},
  doClick = {},
}) {
  return linkAdd ? (
    <_Component className={_utils.cx(_styles, "g-editor-link")} tag="div">
      <SecHead act1Click={cancelClick} titleSrc={headTitleSrc} titleSz="h4" />
      <_Builtin.FormWrapper className={_utils.cx(_styles, "form-addlink")}>
        <_Builtin.FormForm
          name="wf-form-Search"
          data-name="Search"
          method="get"
          id="wf-form-Search"
        >
          <TextfieldForm
            fieldOnChange={txtFldChange}
            fieldFldClick={txtFldClick}
            fld={txtFld}
            lblTop={true}
            fldHelp={false}
            fieldFldIcnDisp="y"
            lblTopLblSrc="Text"
            fieldFldIcnSrc="ed_textlink"
            fieldFldIcn={true}
          />
          <TextfieldForm
            fieldOnChange={linkFldChange}
            fieldFldClick={linkFldClick}
            lblTop={true}
            fldHelp={false}
            lblTopLblSrc="Link"
            fieldFldIcnDisp="y"
            fieldFldIcnSrc="act_link"
            fieldFldIcn={true}
          />
          <ButtonPanel
            btn1Click={doClick}
            btn2={false}
            btn3={false}
            btn1TxtSrc="Done"
            btnPnlOri="hr"
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
  ) : null;
}
