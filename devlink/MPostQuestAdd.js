"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ItemHead } from "./ItemHead";
import { Spacer } from "./Spacer";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { UploadForm } from "./UploadForm";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MPostQuestAdd.module.css";

export function MPostQuestAdd({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  headlineChange,
  headlineClick = {},
  detailChange,
  detailClick = {},
  mediaChange,
  mediaClick = {},
  uploadMap,
  uploadExample = true,
  emojiBtnClick = {},
  doClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-postqa-add")} tag="section">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Ask a Question"
          titleSz="h4"
          sz="m"
          subtxt={true}
          subtxtSrc="Get answers from brands, manufacturers, and other customers ."
        />
        <ItemHead
          itmHead={itmHead}
          itmImgSrc={itmImgSrc}
          name={itmName}
          itmImgAlt={itmImgAlt}
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <Spacer />
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="wf-form-Post-2"
            data-name="Post"
            method="get"
            id="wf-form-Post-2"
          >
            <TextfieldForm
              fieldOnChange={headlineChange}
              fieldFldClick={headlineClick}
              fldHelp={true}
              fldHelpHelpLSrc="What would you like to ask?"
              lblTopLblSrc="Question"
              fldHelpHelpR={true}
              fldHelpHelpRSrc="0/100"
            />
            <TextareaForm
              fieldOnChange={detailChange}
              fieldFldClick={detailClick}
              fieldFldId="description"
              lblTopLblSrc="Detailed description of the question you have"
              fldHelp={true}
              fieldTabOrder="0"
              fld={true}
              fldHelpHelpLSrc=""
              fldHelpHelpR={true}
              fldHelpHelpRSrc="0/500"
            />
            <Spacer />
            <UploadForm
              upldDzClick={mediaClick}
              upldFileMap={uploadMap}
              upldExampleFile={uploadExample}
              upldDzChange={mediaChange}
              fldHelp={false}
              lblTopLblSrc="Media"
              fld={true}
            />
            <Spacer szDep="64" />
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
        bs="s"
      >
        <InputWBtns
          lLBtnClick={emojiBtnClick}
          tTBtnClick={doClick}
          lLBtn={true}
          tTBtnTxtSrc="Done"
          tTBtnTxt={true}
          tTBtnStyle="pf"
          tTBtnSz="l"
          tTBtnIcn={false}
          lLBtnIcnSrc="emj"
          pPToolbar={false}
          pPFld={false}
        />
        <Spacer />
      </_Builtin.Block>
    </_Component>
  );
}
