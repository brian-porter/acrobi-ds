"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { SelectlistForm } from "./SelectlistForm";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { Button } from "./Button";
import { ChipsSs } from "./ChipsSs";
import { SecPeep } from "./SecPeep";
import { TglItm } from "./TglItm";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MGrpMngDetail.module.css";

export function MGrpMngDetail({
  as: _Component = _Builtin.Block,
  dDCancelClick = {},
  dTypePHoldSrc = "Choose a Group Type",
  dTypePHoldClr = "n500",
  dTypeFldId = "type",
  dTypeFldValue,
  dTypeSelectDrpHide = false,
  dTypeMap,
  dNameChange,
  dHandleChange,
  dDescChange,
  dLocationChange,
  dLocationFindClick = {},
  dPrivacyPHoldSrc = "Private",
  dPrivacyPHoldClr = "n500",
  dPrivacyFldId = "privacy",
  dPrivacyFldValue,
  dPrivacySelectDrpHide = false,
  dPrivacyMap,
  dRulesChange,
  dRulesAddClick = {},
  dRolesMap,
  dRolesExample = true,
  dRolesAddClick = {},
  dAdminMap,
  dAdminExample = true,
  dAdminAddClick = {},
  dMbrInvtClick = {},
  dGalPostClick = {},
  dPostApproveClick = {},
  dEraseClick = {},
  dTypeOnChange,
}) {
  return (
    <_Component className={_utils.cx(_styles, "grp-mng-detail_main")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={dDCancelClick}
          titleSrc="Group Details"
          sz="l"
          act1TxtSrc="Cancel"
          titleSz="h4"
          subtxt={true}
          subtxtSrc="Give information about this group for people looking for you. If the privacy is set to community, its shown to the general public."
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body2")} tag="div">
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-block-3")}>
          <_Builtin.FormForm
            name="email-form"
            data-name="Email Form"
            method="get"
            id="email-form"
          >
            <SelectlistForm
              fieldSelectMap={dTypeMap}
              fieldPHoldSrc={dTypePHoldSrc}
              fieldPHoldClr={dTypePHoldClr}
              fieldFldId={dTypeFldId}
              fieldFldValue={dTypeFldValue}
              fieldSelectDrpHide={dTypeSelectDrpHide}
              fieldOnChange={dTypeOnChange}
              lblTopLblSrc="Type"
              fldHelpHelpLSrc="This is used to make it easier for others to find your group"
              lblTopOpt={true}
            />
            <TextfieldForm
              fieldOnChange={dNameChange}
              fldHelpHelpLSrc="What this group is called"
              lblTopOpt={true}
              lblTopOptSrc="required"
              fldHelpHelpRSrc="0/100"
              fldHelpHelpR={true}
              lblTopLblSrc="Name"
              fieldFldPlaceholderSrc="group name"
              fieldTabOrder="0"
            />
            <TextfieldForm
              fieldOnChange={dHandleChange}
              lblTopOpt={true}
              lblTopOptSrc="required"
              lblTopLblSrc="Handle"
              fldHelpHelpLSrc="how others can find and reference the group"
              fldHelpHelpRSrc="0/100"
              fldHelpHelpR={true}
              fieldFldPlaceholderSrc="@group-handle"
              fieldTabOrder="0"
            />
            <TextareaForm
              fieldOnChange={dDescChange}
              lblTopLblSrc="Description"
              lblTopOpt={true}
              fldHelpHelpLSrc="give the purpose of this group"
              fldHelpHelpR={true}
              fldHelpHelpRSrc="0/1000"
              fieldTabOrder="0"
            />
            <TextfieldForm
              fieldOnChange={dLocationChange}
              fieldFldBtnClick={dLocationFindClick}
              fieldFldBtn={true}
              lblTopLblSrc="Location"
              fldHelpHelpLSrc="helps people find this group geographically"
              fieldFldBtnIcnSrc="Geo_findme"
              fieldFldPlaceholderSrc="city, state, country, or zip"
              fieldTabOrder="0"
            />
            <SelectlistForm
              fieldSelectMap={dPrivacyMap}
              fieldPHoldSrc={dPrivacyPHoldSrc}
              fieldPHoldClr={dPrivacyPHoldClr}
              fieldFldId={dPrivacyFldId}
              fieldFldValue={dPrivacyFldValue}
              fieldSelectDrpHide={dPrivacySelectDrpHide}
              lblTopLblSrc="Privacy"
              fldHelpHelpL={false}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "form-columns")}
              tag="div"
            >
              <TextareaForm
                fieldOnChange={dRulesChange}
                lblTopLblSrc="Rules"
                fldHelpHelpLSrc="add rules that should apply"
                fldHelpHelpRSrc="0/1000"
                fieldTabOrder="0"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "form-column-btn")}
                tag="div"
              >
                <Button
                  btnClick={dRulesAddClick}
                  btnTxtSrc="Add"
                  btnIcnSrc="Add"
                  btnStyl="nl"
                  lblSz="r2"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <SecHead titleSrc="Roles" act1={false} titleSz="r2" />
            <_Builtin.Block
              className={_utils.cx(_styles, "form-columns")}
              tag="div"
            >
              <ChipsSs cellMap={dRolesMap} exampleCells={dRolesExample} />
              <Button
                btnClick={dRolesAddClick}
                btnTxtSrc="Add"
                btnSz="m"
                btnIcnSrc="Add"
                btnStyl="nl"
              />
            </_Builtin.Block>
            <SecHead titleSrc="Admin" act1={false} titleSz="r2" />
            <_Builtin.Block
              className={_utils.cx(_styles, "form-columns")}
              tag="div"
            >
              <SecPeep
                conCellMap={dAdminMap}
                conExampleCell={dAdminExample}
                secHead={false}
                stats={false}
                exampleBtn={false}
                exampleCaptSubtxt={false}
                exampleTitleSrc="FName LI"
              />
              <Button
                btnClick={dAdminAddClick}
                btnTxtSrc="Add"
                btnSz="m"
                btnIcnSrc="Add"
                btnStyl="nl"
              />
            </_Builtin.Block>
            <SecHead titleSrc="Permissions" titleSz="r2" act1={false} />
            <_Builtin.Block
              className={_utils.cx(_styles, "side-spacer")}
              tag="div"
            >
              <TglItm
                tglClick={dMbrInvtClick}
                lblSrc="Members can invite their connects"
                tglName="MbrInvt"
                align="l"
              />
              <TglItm
                tglClick={dGalPostClick}
                lblSrc="Allow group gallery post"
                tglName="GalPost"
                align="l"
              />
              <TglItm
                tglClick={dPostApproveClick}
                lblSrc="All posts are admin approved"
                tglName="AdminApprove"
                align="l"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "group-delete")}
              tag="div"
            >
              <Spacer szDep="64" size="64" />
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-100")}
                tag="div"
              >
                <Button
                  btnClick={dEraseClick}
                  btnTxtSrc="Delete Group"
                  btnIcnSrc="group"
                  lblClr="fd500"
                />
              </_Builtin.Block>
              <Spacer szDep="64" size="16" />
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
        <Spacer szDep="64" size="64" />
        <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bdata-top-shadow%3D%22y%22%5D.a-footer%20%7B%0A%09border-top%3A%201px%20solid%3B%0A%20%20color%3A%20var(--color--n300)%3B%0A%20%20box-shadow%3A%200px%20-10px%2010px%200px%20var(--color--n200)%3B%0A%7D%0A%3C%2Fstyle%3E" />
      </_Builtin.Block>
    </_Component>
  );
}
