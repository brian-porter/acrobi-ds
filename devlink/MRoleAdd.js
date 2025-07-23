"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { TextfieldForm } from "./TextfieldForm";
import { FieldLabel } from "./FieldLabel";
import { Cell } from "./Cell";
import { FieldHelper } from "./FieldHelper";
import { TextareaForm } from "./TextareaForm";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MRoleAdd.module.css";

export function MRoleAdd({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  nameChange,
  badgeMap,
  badgeExample = true,
  descChange,
  erase = false,
  eraseClick = {},
  doBtnClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-add-role")}
      tag="section"
      mini=""
      id="Roles"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Role Properties"
          sz="xl"
          act1={true}
          titleSz="h4"
          subtxt={true}
          subtxtSrc="Giving a clear name and purpose for the role will help members understand the context of their role."
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="email-form"
            data-name="Email Form"
            method="get"
            id="email-form"
          >
            <TextfieldForm
              fieldOnChange={nameChange}
              fldHelpHelpLSrc=""
              lblTopOpt={true}
              lblTopOptSrc="required"
              fldHelpHelpRSrc="0/20"
              fldHelpHelpR={true}
              lblTopLblSrc="Name"
              fieldFldPlaceholderSrc="group name"
              fldHelp={true}
              fieldTabOrder="0"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "form_main")}
              tag="div"
            >
              <FieldLabel
                fldLblTop={true}
                lblSrc="Badge Symbol"
                optSrc="required"
                lblFor=""
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "badgebar")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "badgebar-ss")}
                  tag="div"
                >
                  <_Builtin.Grid
                    className={_utils.cx(_styles, "badge-grid")}
                    tag="div"
                  >
                    {badgeMap ?? (
                      <Cell
                        cell={badgeExample}
                        cellSz="m"
                        vizAdpt={true}
                        vizImg={false}
                        captionPriceBdg={false}
                        captionCapStk={true}
                        capStkRow1Src="ItemName"
                        adptAdptSz="m"
                        capStkRowsAlign="c"
                        adptAdptBgClr="n500"
                        caption={false}
                      />
                    )}
                  </_Builtin.Grid>
                </_Builtin.Block>
              </_Builtin.Block>
              <FieldHelper
                helpLSrc=""
                helpRSrc="0/20"
                helpR={true}
                helpL={true}
                fldHelp={false}
              />
            </_Builtin.Block>
            <TextareaForm
              fieldOnChange={descChange}
              lblTopLblSrc="Description"
              fldHelpHelpLSrc="give the purpose of this role"
              fldHelpHelpR={true}
              fldHelpHelpRSrc="0/100"
              fieldTabOrder="0"
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
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <InputWBtns
          lLBtn={erase}
          lLBtnClick={eraseClick}
          tTBtnClick={doBtnClick}
          tTBtn={true}
          pPFld={false}
          lLBtnIcnSrc="delete"
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnTxtSrc="Done"
          tTBtnIcnSrc="default"
          tTBtnStyle="pf"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
